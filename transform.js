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

  // fix some texts
  o = o.replace("{Muddle}", "MUDDLE {Muddle}")
  o = o.replace("{Bless}", "BLESS {Bless}")
  o = o.replace("{Curse}", "CURSE {Curse}")
  o = o.replace("{Wound}", "WOUND {Wound}")
  o = o.replace("{Poison}", "POISON {Poison}")
  o = o.replace("{Disarm}", "DISARM {Disarm}")
  o = o.replace("{Immobilize}", "IMMOBILIZE {Immobilize}")

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
    } else if (o.startsWith("{Rune")) {
      t = {effect: o}
    } else if (o.startsWith("Unlock ")) {
      o = o
        .replace("\"Burning Mountain\" 82", "\"Burning Mountain\" {Scenario82}")
        .replace("\"Sunken Vessel\" 93", "\"Sunken Vessel\" {Scenario93}")
        .replace("\"Temple of the Eclipse\" 81", "\"Temple of the Eclipse\" {Scenario81}")
        .replace("\"Shadows Within\" 83", "\"Shadows Within\" {Scenario83}")
        .replace("\"Sacrifice Pit\" 78", "\"Sacrifice Pit\" {Scenario78}")
        .replace("\"Demonic Rift\" 90", "\"Demonic Rift\" {Scenario90}")
        .replace("\"Corrupted Cove\" 87", "\"Corrupted Cove\" {Scenario87}")
        .replace("\"Wild Melee\" 91", "\"Wild Melee\" {Scenario91}")
        .replace("\"Harried Village\" 86", "\"Harried Village\" {Scenario86}")
        .replace("\"Syndicate Hideout\" 89", "\"Syndicate Hideout\" {Scenario89}")
        .replace("\"Lost Temple\" 79", "\"Lost Temple\" {Scenario79}")
        .replace("\"Crystalline Cave\" 84", "\"Crystalline Cave\" {Scenario84}")
        .replace("\"Merchant Ship\" 74", "\"Merchant Ship\" {Scenario74}")
        .replace("\"Overgrown Graveyard\" 75", "\"Overgrown Graveyard\" {Scenario75}")
        .replace("\"Vermling Nest\" 94", "\"Vermling Nest\" {Scenario94}")
        .replace("\"Vigil Keep\" 80", "\"Vigil Keep\" {Scenario80}")
        .replace("\"Sun Temple\" 85", "\"Sun Temple\" {Scenario85}")



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
    } else if (o.startsWith("Read outcome")) {
      t = {effect: o}
    } else if (o.startsWith("One starts")) {
      t = {effect: o}
// OUTCOMES
    } else if (o.startsWith("OTHERWISE:")) {
      const text = o.split(':').slice(1).join(':').trim()
      // deal with empty text, with read outcome
      if (text.length === 0) {
        t = {
          requirement: "OTHERWISE",
        }
      } else {
        t = {
          requirement: "OTHERWISE",
          text
        }
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
    } else if (o.startsWith("{") && !o.startsWith("{Rune")) {
      // deal with road event 28 and it's weird effects
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

    // sanity check resolves
    if ((eventType === "road")) {
      const shouldHave = e.optionA.outcomes.length + e.optionB.outcomes.length
      const resolves = resolvedEvents[eventType][e.id]
      if (shouldHave !== resolves.length) {
        if ((eventType === "road") && ((e.id === 28) || (e.id === 35) || (e.id === 50))) {
          // deal with road event 28 and don't warn
        } else {
          console.error("DATA ERROR for %s:%i Should have %i but has %i", eventType, e.id, shouldHave, resolves.length)
        }
      }
    }
    e.optionA.outcomes = e.optionA.outcomes.map((o, index) => {

      const res = resolvedEvents[eventType]

      if ((eventType === "city") && ((e.id === 19) && (index === 2))) {
        // city 19, option a has read outcome we need to skip
      } else if ((eventType === "city") && ((e.id === 43) && (index === 1))) {
        // city 43, option a has read outcome we need to skip
      } else if ((eventType === "road") && (e.id === 28) && (index === 1)) {

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
      // city 31, option b has read outcome we need to skip
      // city 49, option b has read outcome we need to skip
      if ((eventType === "city") && ((e.id === 15) || (e.id === 31) || (e.id === 49))) {
        if (index === 0) {
          return o
        } else {
          correctedIndex = correctedIndex -1
        }
      }

      const res = resolvedEvents[eventType]
      if (res[e.id]) {
        if ((eventType === "city") && (e.id === 78) && correctedIndex === 0) {
          // deal with city 78, read outcome
        } else if ((eventType === "road") && (e.id === 28) && correctedIndex === 1) {
          // deal with road 28 read outcome
        } else if ((eventType === "road") && (e.id === 35) && correctedIndex === 2) {
          // deal with road 35 read outcome
        } else if ((eventType === "road") && (e.id === 50) && correctedIndex === 0) {
          // deal with road 50 read outcome
        } else {
          o.resolve = res[e.id][correctedIndex]
          if (!o.resolve) {
            console.log("Error resolve oob for %s:%s,%s", eventType, e.id, correctedIndex)
          }
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

  const fcEvents = JSON.parse(fs.readFileSync("fc.json", 'utf8')).filter (e => e['type'] === eventType)

  try {
    const string = JSON.stringify(events.concat(fcEvents), ['id', 'type', 'instruction', 'requirement', 'text', 'optionA', 'optionB', 'choice', 'outcomes', 'effects', 'resolve'], 2).replace(/\\n/g, "\\n")
    fs.writeFileSync(targetFile, string);
  } catch(err) {
    console.error(err);
  }

} catch (err) {
  console.error(err)
}
