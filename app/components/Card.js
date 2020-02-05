import React from 'react';
import { Text, View, ImageBackground, TouchableOpacity } from 'react-native';

import { backText, backTextEffect,backTextInstruction, frontText, bold } from '../styles/typography'
import Icon, { CardIcon, StyledIcon } from './Icon'
import { useCardDeck } from "../contexts/CardDeckContext"

const Lookup = {
  //classes
  "Brute": <Icon name={'brute'} key={'brute'}/>,
  "Circles": <Icon name={'circles'} key={'circles'}/>,
  "Cragheart": <Icon name={'cragheart'} key={'cragheart'}/>,
  "Cthulu": <Icon name={'cthulu'} key={'cthulu'}/>,
  "Eclipse": <Icon name={'eclipse'} key={'eclipse'}/>,
  "LightningBolts": <Icon name={'eclipse'} key={'eclipse'}/>,
  "Mindthief": <Icon name={'mindthief'} key={'mindthief'}/>,
  "MusicNote": <Icon name={'music-note'} key={'music-note'}/>,
  "PointyHead": <Icon name={'pointy-head'} key={'pointy-head'}/>,
  "Saw": <Icon name={'saw'} key={'saw'}/>,
  "Scoundrel": <Icon name={'scoundrel'} key={'scoundrel'}/>,
  "Spellweaver": <Icon name={'spellweaver'} key={'spellweaver'}/>,
  "Sun": <Icon name={'sun'} key={'sun'}/>,
  "ThreeSpears": <Icon name={'three-spears'} key={'three-spears'}/>,
  "Tinkerer": <Icon name={'tinkerer'} key={'tinkerer'}/>,
  "Triangles": <Icon name={'triangles'} key={'triangles'}/>,
  "TwoMinis": <Icon name={'two-minis'} key={'key-minis'}/>,

  // Status
  'Bless': <Icon name={'bless'} key={'bless'}/>,
  "Check": <Icon name={'check'} key={'check'}/>,
  'Curse': <Icon name={'curse'} key={'curse'}/>,
  'Disarm': <Icon name={'disarm'} key={'disarm'}/>,
  'Immobilize': <Icon name={'immobilize'} key={'immobilize'}/>,
  'Muddle': <Icon name={'muddle'} key={'muddle'}/>,
  'Poison': <Icon name={'poison'} key={'poison'}/>,
  'Strengthen': <Icon name={'strengthen'} key={'strengthen'}/>,
  'Wound': <Icon name={'wound'} key={'wound'}/>,

  // Other
  'MinusOneAttackModifier': <Icon name={'1-attack-modifier'} key={'1-attack-modifier'}/>,
  'PlusOneEnhancement': <Icon name={'plus-one-enhancement'} key={'plus-one-enhancement'}/>,
  'SmallItem': <Icon name={'small-item'} key={'small-item'}/>,
  'Checkbox': <Icon name={'checkbox'} key={'checkbox'}/>,

  // Resolves
  'Remove': <StyledIcon name={'remove-from-game'} style={{fontSize: 18, color: 'white' }} key={'remove-from-game2'}/>,
}

const backgrounds = {
  city: {
    back: require('../../assets/images/city_back.png'),
    front: require('../../assets/images/city_front.png')
  },
  road: {
    back: require('../../assets/images/road_back.png'),
    front: require('../../assets/images/road_front.png')
  }
}

const Bold = ({text}) => {
  return (
    <Text style={bold}>{text}</Text>
  )
}

const colors = {
  city: 'white',
  road: 'black'
}

const Vertical = ({text, style}) => {
  const TEXT_HEIGHT = 20
  const TEXT_LENGTH = 300

  const X_OFFSET = -TEXT_LENGTH / 2.37
  const Y_OFFSET = -134
  return (
    <View style={{ width: 35, height: 300}}>
      <Text style={{
        ...style,
        transform: [
          { rotate: "270deg" },
          { translateX: Y_OFFSET },
          { translateY: X_OFFSET }
        ],
        width: TEXT_LENGTH,
        height: TEXT_HEIGHT
      }}>
        {"Requirements: " + text}
      </Text>
    </View>
  )
}

const FrontContent = ({card}) => {
 const color = colors[card['type']]
 return (
   <View style={{flexDirection:'row', flexWrap:'wrap', height: 530}}>
     <View style={{width: 35, height: "100%"}}>
       {/* left column */}
     </View>

     <View style={{width: 308, height: "100%"}}>
       <View style={{top: 80, height: "78%"}}>
         <Text style={{...frontText, color: color}}>{card.text}</Text>
       </View>
       <View style={{height: "18%"}}>
         <Text style={{...frontText, color: color}}>
           <Bold text={'Option A'} /> {card.optionA.choice}
         </Text>
         <Text style={{...frontText, color: color, top: 12}}>
           <Bold text={'Option B'} /> {card.optionB.choice}
         </Text>
       </View>
       <View style={{height: "4%"}}>
         <Text style={{...frontText, color: color, textAlign: 'center'}}>{card.id}</Text>
       </View>
     </View>

     <View style={{width: 35, height: "100%", flex: 1, flexDirection: "column-reverse"}}>
       { card.requirement &&
         <Vertical style={{...frontText, color: color}} text={card.requirement} />
       }
     </View>
   </View>
  )
}



const Front = ({card}) => {
  return (
    <View style={{width: 378, height: 530  }}>
      <ImageBackground source={backgrounds[card['type']]['front']} style={{width: '100%', height: '100%'}}>
      { (card['type'] === 'city' && card.requirement) ? (
          <ImageBackground source={require('../../assets/images/city_front_overlay.png')} style={{width: '100%', height: '100%'}}>
            <FrontContent card={card} />
          </ImageBackground>
        ) : (
          <FrontContent card={card} />
      )}
      </ImageBackground>
    </View>
  );
}

const RequirementBlock = ({requirement, text, color}) => {
  // 1. we can rely on requirements only to use mono-colored glyphs
  // 2. we can assume that the text after a a requirement is long
  // Because of 2., we can't use the View approach with flex:row and wrap
  // since the text element will be to big and will not wrap just only the
  // first line
  // but because of 1. we are sure that we only get text elements as icons
  // back and not view, so we can nest them in another Text element
  return (
    <Text>
      <TextParser text={requirement + ": " + text} style={{color:color}} />
    </Text>
  )
}

const InstructionBlock = ({text, color}) => {
  // same text parsing logic and caveats as requirements applies
  return (
    <Text>
      <TextParser text={text} style={{...backTextInstruction, color:color, lineHeight: 15}} />
    </Text>
  )
}

const Block = ({text, color}) => {
  return (
    <View>
      <Text style={{...backText, color: color}}>{text}</Text>
    </View>
  )
}

const Blocks = ({instruction, requirement, texts, color }) => {
  const start = requirement ? 1 : 0
  const end = texts.length

  const firstText = texts[0] ? texts[0] : ""

  return (
    <View style={{width: 290}}>
      { instruction &&
        <InstructionBlock text={instruction} color={color}/>
      }
      { requirement &&
        <RequirementBlock requirement={requirement} text={firstText} color={color}/>
      }
      {
        texts.slice(start,end).map((t,i) => <Block text={t} color={color} key={i} />)
      }
    </View>
  )
}

const KeywordRegex = /\s*(\{\w+\})\s*/g;
const splitKeywords = (text) => {
  return text.split(KeywordRegex).filter(s => s !== "")
}

const TextParser = ({text, style}) => {
  if (!text) {
    return null
  }
  const split = splitKeywords(text)
  return (
    split.map((s,i) => {
      if (s.startsWith("{")) {
        const name = s.substr(1, s.length - 2)
        const lookup = Lookup[name]
        if (name.startsWith("Scenario")) {
          const numberPattern = /\d+/g
          const match = name.match(numberPattern).map(Number)
          const number = parseInt(match.join([]))
          const iconName = 'scenario-' + number
          return <Icon name={iconName} key={i}/>
        } else if (name.startsWith("Rune")) {
          const rune = name.slice(-1)
          const iconName = 'rune-' + rune
          return <Icon name={iconName} key={i}/>
        } else if (!lookup) {
          console.warn("MISSING", name)
          return null
        } else if (name.startsWith("Remove")) {
          return lookup
        } else {
          return lookup
        }
      } else {
        return <Text style={{...backText, ...style}} key={i}>{s}</Text>
      }
    })
  )
}

const Effect = ({text, color}) => {
  return (
    <View style={{flexDirection:'row', flexWrap:'wrap'}}>
      <TextParser text={text} style={{...backTextEffect, color:color}}/>
    </View>
  )
}


const Resolve = ({option, resolve, effects}) => {
  const { putBack, destroy } = useCardDeck()
  if (resolve.startsWith("{Remove")) {
    return (
      <TouchableOpacity onPress={destroy}>
        <CardIcon name={'remove-from-game'} style={{fontSize: 32, textAlign: 'right' }} key={'remove-from-game'}/>
      </TouchableOpacity>)
  } else if (resolve.startsWith("{Return")) {
    return (
      <TouchableOpacity onPress={putBack}>
        <CardIcon name={'return-to-deck'} style={{fontSize: 32, textAlign: 'right' }} key={'return-to-deck'}/>
      </TouchableOpacity>)
  } else return null
}

const Outcome = ({outcome, type}) => {
  const requirement = outcome.requirement
  const instruction = outcome.instruction
  const effects = outcome.effects
  const texts = outcome.text ? outcome.text.split("\n\n") : []
  const color = colors[type]

  return (
    <View>
      <Blocks instruction={instruction} requirement={requirement} texts={texts} color={color} />
      { (effects || outcome.resolve) &&
        <View style={{width: 315, flexDirection:'row', flexWrap:'wrap'}}>
          <View style={{width: 270, flexDirection:'column', justifyContent: 'flex-end'}}>
          { effects &&
            effects.map((e,i) => <Effect text={e} color={color} key={i} />)
          }
          </View>
          <View style={{height: 35,width: 40, position: 'absolute', left: 270, bottom: 0}}>
            <Resolve resolve={outcome.resolve} />
          </View>
        </View>
      }
    </View>
  )
}

const Outcomes = ({outcomes, type}) => {
  return outcomes.map((outcome, index) => <Outcome outcome={outcome} type={type} key={index} />)
}

const Back = ({card}) => {
  return (
    <View style={{width: 378, height: 530}}>
      <ImageBackground source={backgrounds[card['type']]['back']} style={{width: '100%', height: '100%'}}>
        <View style={{left: 55, top: 20, width: 315, height: "50%"}}>
          <Outcomes outcomes={card.optionA.outcomes} type={card['type']} />
        </View>
        <View style={{left: 55, top: 30, width: 315, height: "50%"}}>
          <Outcomes outcomes={card.optionB.outcomes} type={card['type']} />
        </View>
      </ImageBackground>
    </View>
  );
}

export default function Card(props) {
  if (props.side === 'front')
    return Front(props)
  else
    return Back(props)
}
