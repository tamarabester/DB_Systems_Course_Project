import wikipedia

SUMMARY_LEN = 5
STAFF_PICK_MOVIES = [
    dict(title="Frozen",
         wiki_link="https://en.wikipedia.org/wiki/Frozen_(2013_film)",
         # image="./images/frozen.jpg",
         image="https://media.giphy.com/media/6ym6xK7Omq9Ak/giphy.gif",
         summary="Frozen is a 2013 American 3D computer-animated musical fantasy"
                 " film produced by Walt Disney Animation Studios and released"
                 " by Walt Disney Pictures. The 53rd Disney animated feature film,"
                 " it is inspired by Hans Christian Andersen\'s fairy tale"
                 " \"The Snow Queen\". The film depicts a princess who sets"
                 " off on a journey alongside an iceman, his reindeer, and"
                 " a snowman to find her estranged sister, whose icy powers"
                 " have inadvertently trapped their kingdom in eternal winter."
                 "\nFrozen underwent several story treatments before being"
                 " commissioned in 2011 as a screenplay by Jennifer Lee,"
                 " who co-directed with Chris Buck. The film features"
                 " the voices of Kristen Bell, Idina Menzel, Jonathan Groff,"
                 " Josh Gad, and Santino Fontana."),
    dict(title="Harry Potter",
         wiki_link="https://en.wikipedia.org/wiki/Harry_Potter_(film_series)",
         # image="./images/harry_potter.png",
         image="https://media.giphy.com/media/mz1kJeDVueKC4/giphy.gif",
         summary="Harry Potter is a film series based on the eponymous"
                 " novels by J. K. Rowling. The series is distributed "
                 "by Warner Bros. and consists of eight fantasy films, "
                 "beginning with Harry Potter and the Philosopher's Stone"
                 " (2001) and culminating with Harry Potter and the "
                 "Deathly Hallows – Part 2 (2011). A spin-off prequel series"
                 " that will consist of five films started with Fantastic "
                 "Beasts and Where to Find Them (2016), marking the beginning "
                 "of the Wizarding World shared media franchise.The series"
                 " was mainly produced by David Heyman, and stars Daniel"
                 " Radcliffe, Rupert Grint, and Emma Watson as the three leading"
                 " characters: Harry Potter, Ron Weasley, and Hermione Granger."
                 " Four directors worked on the series: Chris Columbus, "
                 "Alfonso Cuarón, Mike Newell, and David Yates."),
    dict(title="The Blind Side",
         wiki_link="https://en.wikipedia.org/wiki/The_Blind_Side_(film)",
         # image="./images/the_blind_side.jpg",
         image="https://media.giphy.com/media/LXk38fUvOh2Mw/giphy.gif",
         summary="The Blind Side is a 2009 American biographical sports "
                 "drama film written and directed by John Lee Hancock. "
                 "Based on the 2006 book The Blind Side: Evolution of "
                 "a Game by Michael Lewis, the film tells the story of "
                 "Michael Oher, an American football offensive lineman who"
                 " overcame an impoverished upbringing to play in the National"
                 " Football League (NFL) with the help of his adoptive parents"
                 " Sean and Leigh Anne Tuohy. It stars Sandra Bullock as Leigh"
                 " Anne Tuohy, Tim McGraw as Sean Tuohy, and Quinton Aaron as Oher."
                 "\nThe film was a commercial success, grossing $309 million on a"
                 " $29 million budget. Despite mixed reviews from critics, Bullock's"
                 " performance was universally praised, leading to her winning the "
                 "Academy Award for Best Actress."),
    dict(title="Beetlejuice",
         wiki_link="https://en.wikipedia.org/wiki/Beetlejuice",
         # image="./images/beetlejuice.png",
         image="https://media.giphy.com/media/Rfeku3MGlfuPm/giphy.gif",
         summary="Beetlejuice is a 1988 American fantasy comedy film directed "
                 "by Tim Burton, produced by the Geffen Company, and distributed "
                 "by Warner Bros. Pictures. The plot revolves around a recently"
                 " deceased couple (Alec Baldwin and Geena Davis) who become"
                 " ghosts haunting their former home, and an obnoxious, devious"
                 " poltergeist named Betelgeuse (pronounced and occasionally "
                 "spelled Beetlejuice in the film and portrayed by Michael Keaton)"
                 " from the Netherworld who tries to scare away the new inhabitants"
                 " (Catherine O'Hara, Jeffrey Jones, and Winona Ryder).\n"
                 "Beetlejuice was a critical and commercial success, grossing US$73.7"
                 " million from a budget of US$15 million. It won the Academy Award "
                 "for Best Makeup and three Saturn Awards: Best Horror Film, Best "
                 "Makeup, and Best Supporting Actress for Sylvia Sidney."),
]

STAFF_PICK_LEN = len(STAFF_PICK_MOVIES)
