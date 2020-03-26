/*
 * Copyright (c) 2014-2020 Bjoern Kimminich.
 * SPDX-License-Identifier: MIT
 */

import {
  waitForInputToHaveValue,
  waitForElementsInnerHtmlToBe,
  waitInMs
} from '../helpers/helpers'
import { ChallengeInstruction } from '../'

export const BonusPayloadInstruction: ChallengeInstruction = {
  name: 'Bonus Payload',
  hints: [
    {
      text:
        'Assuming you did the **DOM XSS** tutorial already, this one just uses a funnier payload on the _Search_ field.',
      fixture: '#searchQuery',
      unskippable: true,
      resolved: waitInMs(10000) // TODO Add check if "DOM XSS" is solved and if not recommend doing that first
    },
    {
      text: 'Enter or paste this payload into the _Search_ field: <code>&lt;iframe width=&quot;100%&quot; height=&quot;166&quot; scrolling=&quot;no&quot; frameborder=&quot;no&quot; allow=&quot;autoplay&quot; src=&quot;https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/771984076&amp;color=%23ff5500&amp;auto_play=true&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;show_teaser=true&quot;&gt;&lt;/iframe&gt;</code>.',
      fixture: '#searchQuery',
      unskippable: true,
      resolved: waitForInputToHaveValue('#searchQuery input', '<iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/771984076&color=%23ff5500&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe>')
    },
    {
      text: 'Make sure your speaker volume is cranked up. Then hit enter.',
      fixture: '#searchQuery',
      unskippable: true,
      resolved: waitForElementsInnerHtmlToBe('#searchValue', '<iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/771984076&color=%23ff5500&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe>')
    },
    {
      text:
        '🎉 Congratulations and enjoy the music!',
      fixture: '.noResult',
      resolved: waitInMs(5000)
    }
  ]
}
