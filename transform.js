const fs = require('fs')

const groupOutcomes = (arr) => {
  var outcomes = []
  var current = {}
  for (var i = 0; i < arr.length; i++) {
    const o = arr[i]
    if (Object.keys(current).length === 0) {
      // new outcome
      if (!(('effect' in o) || 'requirement' in o)) {
        current = o
      } else if ('effect' in o) {
        throw "effect on empty object!";
      } else if ('requirement' in o) {
        current = o
      }
    } else {
      // existing outcome
      if (!(('effect' in o) || 'requirement' in o)) {
        if (current.text) {
          current.text = current.text + "\n\n" + o.text
        } else {
          current = o
        }
      } else if ('effect' in o) {
        if (current.effects) {
          current.effects.push(o.effect)
        } else {
          current.effects = [o.effect]
        }
      } else if ('requirement' in o) {
        outcomes.push(current)
        current = o
      }
    }
  }
  // push last
  if (Object.keys(current).length != 0) {
    outcomes.push(current)
    current = {}
  }
  return outcomes
}

const transformOutcome = (arr) => {
  return arr.map( o => {
// EFFECTS
    var t = o
    if (o.startsWith("No effect")) {
      t = {effect: o}
    } else if (o.startsWith("Gain ")) {
      t = {effect: o}
    } else if (o.startsWith("Lose ")) {
      t = {effect: o}
    } else if (o.startsWith("Either lose ")) {
      t = {effect: o}
    } else if (o.startsWith("Party Achievement")) {
      t = {effect: o}
    } else if (o.startsWith("Global Achievement")) {
      t = {effect: o}
    } else if (o.startsWith("Unlock ")) {
      t = {effect: o}
    } else if (o.startsWith("All start ")) {
      t = {effect: o}
    } else if (o.startsWith("Reputation")) {
      t = {effect: o}
    } else if (o.startsWith("Add Road")) {
      t = {effect: o}
    } else if (o.startsWith("Add City")) {
      t = {effect: o}
    } else if (o.startsWith("Discard")) {
      t = {effect: o}
    } else if (o.startsWith("Consume")) {
      t = {effect: o}
    } else if (o.startsWith("One starts")) {
      t = {effect: o}
// OUTCOMES
    } else if (o.startsWith("OTHERWISE:")) {
      const text = o.split(':').slice(1).join(':').trim()
      t = {
        requirement: "OTHERWISE",
        text
      }
    } else if (o.startsWith("PAY")) {
      const requirement = o.split(':')[0]
      const text = o.split(':').slice(1).join(':').trim()
      t = {
        requirement: requirement.trim(),
        text
      }
    } else if (o.startsWith("REPUTATION")) {
      const requirement = o.split(':')[0]
      const text = o.split(':').slice(1).join(':').trim()
      t = {
        requirement: requirement.trim(),
        text
      }
    // maps against class requirements
    } else if (o.startsWith("{")) {
      // deal with road event 28
      if (o.includes("additional")) {
        t = {effect: o}
      } else {
        const requirement = o.split(':')[0]
        const text = o.split(':').slice(1).join(':').trim()
        t = {
          requirement,
          text
        }
      }
    } else {
      t = { text: o }
    }

    return t
  })
}

const [eventType, stubFile, targetFile] = process.argv.slice(2);

  const resolvedEvents = JSON.parse(fs.readFileSync("resolves.json", 'utf8'))

try {
  console.log("Preparing event TYPE", eventType)
  console.log("Reading from STUB", stubFile)
  console.log("Writing to TARGET", targetFile)

  const tsString = fs.readFileSync(stubFile, 'utf8')
  const events = eval(tsString)

  events.map( e => {
    delete e.id
    delete e.verified
    delete e.imageUrl
    delete e.optionA.imageUrl
    delete e.optionB.imageUrl
    e.id = e.number
    delete e.number

    // add type
    e['type'] = eventType

    e.optionA.outcome = e.optionA.outcome.split("\n\n")
    e.optionB.outcome = e.optionB.outcome.split("\n\n")

    e.optionA.outcome = transformOutcome(e.optionA.outcome)
    e.optionB.outcome = transformOutcome(e.optionB.outcome)

    e.optionA.outcomes = groupOutcomes(e.optionA.outcome)
    e.optionB.outcomes = groupOutcomes(e.optionB.outcome)

    // add esolves

    // sainity check resolves
    // warn for road only for now
    if ((eventType === "road")) {
      const shouldHave = e.optionA.outcomes.length + e.optionB.outcomes.length
      const resolves = resolvedEvents[eventType][e.id]
      if (shouldHave !== resolves.length) {
        if ((eventType === "road") && (e.id === 28)) {
          // deal with road event 28 and don't warn
        } else {
          console.error("DATA ERROR for %s:%i Should have %i but has %i", eventType, e.id, shouldHave, resolves.length)
        }
      }
    }
    e.optionA.outcomes = e.optionA.outcomes.map((o, index) => {

      const res = resolvedEvents[eventType]

      if ((eventType === "road") && (e.id === 28) && (o.text.includes("Read outcome"))) {
        // deal with road event 28 and don't add resolve
      } else {
        if (res[e.id]) {
          o.resolve = res[e.id][index]
        } else {
          console.log("Default resolve for %s:%s,%s", eventType, e.id, index)
          o.resolve = "{Remove}"
        }
      }
      return o
    })

    e.optionB.outcomes = e.optionB.outcomes.map((o, index) => {
      var correctedIndex = e.optionB.outcomes.length + index - 1

      // city 15 has a preamble text, we need to skip
      if ((eventType === "city") && (e.id === 15)) {
        if (index === 0) {
          return o
        } else {
          correctedIndex = correctedIndex -1
        }
      }

      const res = resolvedEvents[eventType]
      if (res[e.id]) {
        o.resolve = res[e.id][correctedIndex]
        if (!o.resolve) {
          console.log("Error resolve oob for %s:%s,%s", eventType, e.id, correctedIndex)
        }
      } else {
        console.log("Default resolve for %s:%s,%s", eventType, e.id, index)
        o.resolve = "{Remove}"
      }
      return o
    })

    delete e.optionA.outcome
    delete e.optionB.outcome

    return e
  })

  try {
    const string = JSON.stringify(events, ['id', 'type', 'requirement', 'text', 'optionA', 'optionB', 'choice', 'outcomes', 'effects', 'resolve'], 2).replace(/\\n/g, "\\n")
    fs.writeFileSync(targetFile, string);
  } catch(err) {
    console.error(err);
  }

} catch (err) {
  console.error(err)
}
