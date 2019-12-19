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
      const escaped = o.replace('<', '{{{Less}}}').replace('>', '{{{More}}}')
      t = {effect: escaped}
    } else if (o.startsWith("Add Road")) {
      t = {effect: o}
    } else if (o.startsWith("Add City")) {
      t = {effect: o}
// OUTCOMES
    } else if (o.startsWith("OTHERWISE:")) {
      const text = o.split(':').slice(1).join(':')
      t = {
        requirement: "OTHERWISE",
        text
      }
    } else if (o.startsWith("PAY")) {
      const requirement = o.split(':')[0]
      const escaped = requirement.replace('<', '{{{Less}}}').replace('>', '{{{More}}}')
      const text = o.split(':').slice(1).join(':')
      t = {
        requirement: escaped,
        text
      }
    } else if (o.startsWith("REPUTATION")) {
      const requirement = o.split(':')[0]
      const escaped = requirement.replace('<', '{{{Less}}}').replace('>', '{{{More}}}')
      const text = o.split(':').slice(1).join(':')
      t = {
        requirement: escaped,
        text
      }
    } else if (o.startsWith("{{")) {
      const requirement = o.split(':')[0]
      const text = o.split(':').slice(1).join(':')
      t = {
        requirement,
        text
      }
    } else {
      t = { text: o }
    }

    return t
  })
}

const [eventType, stubFile, targetFile] = process.argv.slice(2);

try {
  const tsString = fs.readFileSync(stubFile, 'utf8')
  const events = eval(tsString)

  console.log("Preparing event TYPE", eventType)
  console.log("Reading from STUB", stubFile)
  console.log("Writing to TARGET", targetFile)

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

    var regex = /(\{\w{3,20}\})/g;
    e.optionA.outcome = e.optionA.outcome.replace(regex, "\{\{$1\}\}");
    e.optionB.outcome = e.optionB.outcome.replace(regex, "\{\{$1\}\}");

    e.optionA.outcome = e.optionA.outcome.split("\n\n")
    e.optionB.outcome = e.optionB.outcome.split("\n\n")

    e.optionA.outcome = transformOutcome(e.optionA.outcome)
    e.optionB.outcome = transformOutcome(e.optionB.outcome)

    e.optionA.outcomes = groupOutcomes(e.optionA.outcome)
    e.optionB.outcomes = groupOutcomes(e.optionB.outcome)

    // add default resolves
    e.optionA.outcomes = e.optionA.outcomes.map(o => {
      o.resolve = "{{{Remove}}}"
      return o
    })
    e.optionB.outcomes = e.optionB.outcomes.map(o => {
      o.resolve = "{{{Remove}}}"
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
