---
title: "Corne Keyboard Build" 
categories:
  - Blog
tags:
  - Technology
  - Keyboards
header:
  teaser: "/assets/images/custom-keyboards/hero.pngremote-teaser.jpg"
hidden: false
---

![Hero Image](/assets/images/custom-keyboards/hero.png)
> Going off the deep end with custom keyboards

# Why would you do this to yourself?
For a while now I have been interested in custom keyboards. As a software engineer, it's a fundamental tool of the trade, and a keyboard can be something you
can really personalise and make your own.

Does a custom keyboard make you better at solving problems? No. But if you choose something like the [Corne keyboard](https://github.com/foostan/crkbd),
it can definitely make those problems just a little harder to solve.

So, I've been using a [Corne keyboard](https://github.com/foostan/crkbd) for a few months now, and I'm not sure if I love it.
It's a split keyboard with a 40% layout, which means it's small and has fewer keys than a standard keyboard; you have to
rely on layers to access all the keys you need. For me, that has ment a lot of relearning how to type, and I'm still not 
sure if it's worth it... yet.

I find myself breaking the golden rule of adapting to a radically different keyboard; when things need to get done, I plug in my regular old keyboard. Now I 
suck at not one, but two keyboard layouts.

Don't get me wrong, I'm not giving up, I just need a break from the incessant typos - especially when I am pairing. 

## The Build
I am in no way a purist. I don't have the patience or the skill to hardwire a keyboard (I would end up with so many dodgy solder joints...) 
so I opted to go for a prebuilt V4 from [Keebd.com](https://keebd.com/collections/keyboard-assembled). It is just the pcb and case, so I still got
to choose what switches and keycaps I wanted to use. 

I went with the following:
- [Corne v4 MX Keyboard](https://keebd.com/products/corne-v4-mx-keyboard)
- [Gateron Milky Yellow Pro Switches](https://www.amazon.com.au/gp/product/B0D1GC59LC/ref=ppx_yo_dt_b_search_asin_title?ie=UTF8&th=1)
- [CFX MX BoW Low Profile Keycap](https://keebd.com/products/cfx-mx-bow-low-profile-keycap-set)
- [White Coiled Keyboard Cable](https://www.amazon.com.au/gp/product/B0CRKPNGCJ/ref=ppx_yo_dt_b_search_asin_image?ie=UTF8&th=1)

![My build](/assets/images/custom-keyboards/my-build.png)

I liked the idea of a small split because it is relatively easy to travel with. For the one day that I go to the office I want to take it in.
With that in mind, I needed softer switches, so I went with the Gateron Milky Yellow Pro switches. They are linear and don't have that
satisfying click that I love, but they are smooth and quiet. The build is also lacking the nice thock I have on my AJAZZ keyboard that
I got some heat for using at work the one time I took it in.

The keycaps are low profile, which I do like, but they are opaque, so I lose a little of the RGB underglow that the Corne has. I'm not super 
bothered about that to be honest, I don't look at my keyboard when I type.

I went for the V4 because it has a few extra keys available to it, but losing bluetooth is a bit of a bummer. My setup at home has my personal
surface pro sitting under my monitor, and it is nice to be able to switch to that to send messages or do some personal work I like to keep separate
from my work machine.

## VIAL Firmware
The Corne keyboard is supported by VIAL firmware, which is nice and open source. I use [vial.rocks](https://vial.rocks/) to configure my keyboard, 
so far it has everything I have needed to get going. 

I only have two layers to get started, perhaps I will get to a third, but for now I want to keep things as simple as I can. Here is what it looks like
and keep in mind this is fairly new and fluid for me still:

### Layer 0
![Layer 0](/assets/images/custom-keyboards/layer-0.png)

This is the default layer that will start up when the keyboard is plugged in. It has all the basic keys needed for typing, 
but you will notice that there aren't any direct keys for numbers, F keys or arrow keys; that is what layer 1 is for.

You will probably also notice that there is no dedicated keys for shift, control, alt or the command key. These are all 
taken care of by using the [home row mods](https://precondition.github.io/home-row-mods) that I have mapped to the bottom row.
This took a bit of getting used to, but I actually really like it, to the point that I would look to use this method for 
any programmable keyboard I use in the future.

I won't go too deep here, the blog linked above does a great job of explaining the concept. A quick summary is that you
use the long press of a key to access the modifier key. For example, I can hold down the:
- `z` or `/` key to emulate `control`
- `x` or `.` key to emulate `option`
- `c` or `,` key to emulate `command`
- `v` or `m` key to emulate `shift`

This frees up the thumb keys for other things, like the space bar, enter key, moving up and down layers etc.    

### Layer 1
![Layer 1](/assets/images/custom-keyboards/layer-1.png)

This layer can be accessed temporarily by holding down the `raise` key, or permanently by tapping the `raise` key (for my setup the middle key on the thumb cluster).

It gives me access to the numbers on the top row, the F keys on the bottom row, and the arrow keys using the `hjkl` keys, as vi users would expect. It also gives
me access to some media keys to control my music and volume.

I do have a third layer, but all that did was play with the keyboard settings like the RGB patterns and the underglow brightness. I don't need to access that generally
so I have kind of forgotten about it.

## Conclusion
I am enjoying the journey, to be honest. It does make me feel like I am learning to type all over again, but I am getting faster and more accurate, and it is starting
to feel more natural. I am enjoying the process, although the jump from a 75% layout to a 40% layout is a big one, and on top of that from staggered to columnar layout is
just an extra layer of fat fingeredness that I have to deal with.

There is a lot of tinkering to be done just setting up the keymap just right, and I am sure I will be tweaking it for a while yet. I think that is part of the 
attraction for me, the ability to make it my own. 
