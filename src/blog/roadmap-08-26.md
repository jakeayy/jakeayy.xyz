---
title: Roadmap - August 2026
date: 2026-08-03
description: Some ideas I got this month I want to eventually make
image: assets/roadmap-08-26.png
tags: ["roadmap"]
published: true
---

Hi! For the past few weeks I've been really and I mean **REALLY** busy. Mainly things such as work, moving out etc. But since I am currently getting in more stable grounds I decided I'll create a roadmap of what I currently think of doing and what I might do in future when I'll have more capabilities. That's also my second ever post, I expected initially to make them quite often but well, I'm not a good writer.

## Roadmap
Take this roadmap with a grain of salt. It's a list that might *(and probably will)* change.

### 1. Starshift improvements
[Starshift](https://codeberg.org/jakeayy/Starshift) is a modloader I'm making for the game In Stars and Time that lets you add various new features and techniques to the game. It also introduced unofficial support for Linux with full Steam integration!

While heavily in paused development as of recently because of my private life, I've been having a lot of ideas how to improve it.

One of them was an editor mode. What would it do was basically you'd enable this feature in Starshift settings, it would start backup your whole game assets directory and let you edit game files freely. Then once you'd finish you could click a button like *Finish Editing* and it would create directory with diffs that could easily apply alongside other mods, without clashing *(unless your and other mod would ACTUALLY change the same line, but that in next idea)*. That would require me to do a highly efficient diff checker that would walk through files of original game and compare it with actual ones.

But as mentioned earlier, what if both files want to edit the same file? I thought about it and I'd make a system where user can **decide** between 2 mods, which edit to apply. The override would then save until mods change to reduce amount of choices between game reboots.

Another idea was **ANOTHER** rewrite. But hear me out before you scream at me. I know it's silly that it would be a second rewrite. But considering current stage of the loader and the fact I've been getting messages about platform incompatiblity I might as well do that. It would mainly consist of me rewriting the CORE loader, all the core mods would stay intact. Maybe a bit controversial decision but I'd go with something more native like Rust rather than using JavaScript. That would let me to use full capability and speed of user's device without doing tricky workarounds to speed up some processes. (like earlier menioned editor mode)

Last idea for now that I've had for a long time in my mind was a smart sprite patcher. Basically when you'd use editor mode, the game would apply difference mask on all the sprites and check between each other if any of them are changed. If so, apply the patch. Next mod. Does the patch clash with one another? If so, ask the user which patch to apply. It would consist of very basic checks that would get cached to speed up the process. That way, you should be able to edit spritesheets without the issue of one mod changing one icon while other changes other icon and everything breaking because of that.

One problem with this would be image compression. JPEG files would easily modify many pixels unknowingly so I'd have to implement toleration scale.

As a note I really have to thank creators of [OneLoader](https://github.com/rphsoftware/OneLoader) - a mod loader for the game OMORI. They are an inspiration for everything I'm doing right now. It's my own decision though to not look through their source code until I am very certain I don't know how to make something.

### 2. New Deltarune-inspired ISAT mod?
With that said, after improving my mod loader other idea was. Since it's been a little bit of time that [DELTARUNE](https://deltarune.com/) has came out a lot of stuff was revealed, including it's Weird Route in Chapter 5.

Some time after that I've noticed 2 interesting posts related to it:

https://x.com/KLanausse/status/2083137188720422970
https://x.com/Shiahuahuaa/status/2083690578588352612

Those are jokingly made Weird Route OST that could potenrially play if it was in ISAT, and the other one is a comic that demonstrates how such route could look like.

My idea was to make such mod, it would be called something like "Weird Event" as people playing ISAT tend to call various random occurences in the game "events".

That would require me to create a lot of sprites for Loop and Siffrin (including few where they are together), finish improvements mentioned before and a song. Luckily, after contacting the great creator - Lanausse - I got a permission to use that song in a mod.

*(as a reminder, if you're a spriter you can contact me though ways I listed on [my website](/), I'll properly credit you and maybe even pay depending on a scale)*

### 3. Codename: SOUL
This one is quite different. I don't really want to spoil much as it's gonna introduce a new era of UNDERTALE and DELTARUNE fangame making. But I can say that it'll be worth the wait.

There's a whole private roadmap I created months ago to this project but I'd rather not release it yet. Just be ready to hear from me once I'll be certain it can be published! :)

## Ending note
The whole roadmap is still mainly in planning stage. Don't expect any of these plans to come out anytime soon but do know I have ideas for the future (and possibly when I'll get better PC for all of this as a 4gb RAM PC won't make it.)
