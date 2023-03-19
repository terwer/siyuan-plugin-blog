export default defineEventHandler(async (event) => {
  // Meilisearch is binded into Nitro Context
  // const { serverMeilisearchClient } = event.context

  // const addRecordRes = await serverMeilisearchClient.index("movies").addDocuments({
  //   id: 999999994234,
  //   title: "Batman Unmasked: The Psychology of the Dark Knight",
  //   poster: "https://image.tmdb.org/t/p/w1280/jjHu128XLARc2k4cJrblAvZe0HE.jpg",
  //   overview: "Delve into the world of Batman and the vigilante justice tha",
  //   release_date: "2008-07-15",
  // })

  const mockResponse = {
    hits: [
      {
        id: 426674,
        title: "Once 这是测试标签啊 Upon a Sesame Street Christmas",
        overview:
          'This holiday 测试中文啊 special goes back in time to show how Elmo\'s ancestors--not to mention those of Grover, Big Bird, Bert, Ernie, Oscar the Grouch and Cookie Monster--helped transform "the most unfriendly street in town" into the bright, kind, music-filled place it is today.',
        genres: ["Family"],
        poster: "https://image.tmdb.org/t/p/w500/3Nioii38Lgn9uZvhugKyrad8TBj.jpg",
        release_date: 1480032000,
        _formatted: {
          id: "426674",
          title: "Once Upon 这是测试标签 a __ais-highlight__Sesa__/ais-highlight__me Street Christmas",
          overview:
            'This holiday 假期 special goes back in time to show how Elmo\'s ancestors--not to mention those of Grover, Big Bird, Bert, Ernie, Oscar the Grouch and Cookie Monster--helped transform "the most unfriendly street in town" into the bright, kind, music-filled place it is today.',
          genres: ["Family"],
          poster: "https://image.tmdb.org/t/p/w500/3Nioii38Lgn9uZvhugKyrad8TBj.jpg",
          release_date: "1480032000",
        },
      },
      {
        id: 36536,
        title: "Follow That Bird",
        overview:
          "Big Bird is sent to live far from Sesame Street by a pesky social worker. Unhappy, Big Bird runs away from his foster home, prompting the rest of the Sesame Street gang to go on a cross-country journey to find him.",
        genres: ["Adventure", "Comedy", "Family", "Music"],
        poster: "https://image.tmdb.org/t/p/w500/fpx6RC8ShfMnu6LNP2Zpu2RumaV.jpg",
        release_date: 491788800,
        _formatted: {
          id: "36536",
          title: "Follow That Bird",
          overview:
            "Big Bird is sent to live far from __ais-highlight__Sesa__/ais-highlight__me Street by a pesky social worker. Unhappy, Big Bird runs away from his foster home, prompting the rest of the __ais-highlight__Sesa__/ais-highlight__me Street gang to go on a cross-country journey to find him.",
          genres: ["Adventure", "Comedy", "Family", "Music"],
          poster: "https://image.tmdb.org/t/p/w500/fpx6RC8ShfMnu6LNP2Zpu2RumaV.jpg",
          release_date: "491788800",
        },
      },
      {
        id: 48340,
        title: "Sanctum",
        overview:
          "Master diver Frank McGuire (Richard Roxburgh) has explored the South Pacific's Esa-ala Caves for months.  But when his exit is cut off in a flash flood, Frank's team—including 17-year-old son Josh (Rhys Wakefield) and financier Carl Hurley (Ioan Gruffudd)—are forced to radically alter plans.  With dwindling supplies, the crew must navigate an underwater labyrinth to make it out.  Soon, they are confronted with the unavoidable question: Can they survive, or will they be trapped forever?",
        genres: ["Action", "Thriller"],
        poster: "https://image.tmdb.org/t/p/w500/zRUNv1CbeVtmTCNr6RLHnxV2QYm.jpg",
        release_date: 1296691200,
        _formatted: {
          id: "48340",
          title: "Sanctum",
          overview:
            "Master diver Frank McGuire (Richard Roxburgh) has explored the South Pacific'__ais-highlight__s__/ais-highlight__ __ais-highlight__Esa__/ais-highlight__-ala Caves for months.  But when his exit is cut off in a flash flood, Frank's team—including 17-year-old son Josh (Rhys Wakefield) and financier Carl Hurley (Ioan Gruffudd)—are forced to radically alter plans.  With dwindling supplies, the crew must navigate an underwater labyrinth to make it out.  Soon, they are confronted with the unavoidable question: Can they survive, or will they be trapped forever?",
          genres: ["Action", "Thriller"],
          poster: "https://image.tmdb.org/t/p/w500/zRUNv1CbeVtmTCNr6RLHnxV2QYm.jpg",
          release_date: "1296691200",
        },
      },
      {
        id: 16275,
        title: "Dave Chappelle: Killin' Them Softly",
        overview:
          "Dave Chappelle returns for a stand-up to D.C. and riffs on politics, police, race relations, drugs, Sesame Street and more.",
        genres: ["Comedy", "Documentary"],
        poster: "https://image.tmdb.org/t/p/w500/xQAwaRVkaYtgEbFzsUrYzduJsOd.jpg",
        release_date: 964569600,
        _formatted: {
          id: "16275",
          title: "Dave Chappelle: Killin' Them Softly",
          overview:
            "Dave Chappelle returns for a stand-up to D.C. and riffs on politics, police, race relations, drugs, __ais-highlight__Sesa__/ais-highlight__me Street and more.",
          genres: ["Comedy", "Documentary"],
          poster: "https://image.tmdb.org/t/p/w500/xQAwaRVkaYtgEbFzsUrYzduJsOd.jpg",
          release_date: "964569600",
        },
      },
      {
        id: 13247,
        title: "A Muppet Family Christmas",
        overview:
          "In this one-hour Christmas special, Fozzie Bear surprises his mother Emily on Christmas Eve by bringing the entire Muppet gang to her farm to celebrate the holidays. Doc and his dog Sprocket, who had planned a quiet Christmas, end up joining the Muppets in their holiday activities and preparations.The Sesame Street regulars, including Big Bird, Bert, Ernie and others, join the festivities, but to Kermit's dismay, the only one missing is Miss Piggy, who has been caught in a snowstorm.",
        genres: ["Family", "Comedy", "TV Movie", "Music"],
        poster: "https://image.tmdb.org/t/p/w500/4A5EaZptr1cgWD1BlqqUJhkFCPh.jpg",
        release_date: 566611200,
        _formatted: {
          id: "13247",
          title: "A Muppet Family Christmas",
          overview:
            "In this one-hour Christmas special, Fozzie Bear surprises his mother Emily on Christmas Eve by bringing the entire Muppet gang to her farm to celebrate the holidays. Doc and his dog Sprocket, who had planned a quiet Christmas, end up joining the Muppets in their holiday activities and preparations.The __ais-highlight__Sesa__/ais-highlight__me Street regulars, including Big Bird, Bert, Ernie and others, join the festivities, but to Kermit's dismay, the only one missing is Miss Piggy, who has been caught in a snowstorm.",
          genres: ["Family", "Comedy", "TV Movie", "Music"],
          poster: "https://image.tmdb.org/t/p/w500/4A5EaZptr1cgWD1BlqqUJhkFCPh.jpg",
          release_date: "566611200",
        },
      },
      {
        id: 75301,
        title: "Being Elmo: A Puppeteer's Journey",
        overview:
          "Beloved by children of all ages around the world, Elmo is an international icon. Few people know his creator, Kevin Clash, who dreamed of working with his idol, master puppeteer Jim Henson. Displaying his creativity and talent at a young age, Kevin ultimately found a home on Sesame Street. Narrated by Whoopi Goldberg, this documentary includes rare archival footage, interviews with Frank Oz, Rosie O’Donnell, Cheryl Henson, Joan Ganz Cooney and others and offers a behind-the-scenes look at Sesame Street and the Jim Henson Workshop.",
        genres: ["Documentary", "Family"],
        poster: "https://image.tmdb.org/t/p/w500/7W2jIcJoWyMaYNiSkCxhZQX3OQF.jpg",
        release_date: 1319155200,
        _formatted: {
          id: "75301",
          title: "Being Elmo: A Puppeteer's Journey",
          overview:
            "Beloved by children of all ages around the world, Elmo is an international icon. Few people know his creator, Kevin Clash, who dreamed of working with his idol, master puppeteer Jim Henson. Displaying his creativity and talent at a young age, Kevin ultimately found a home on __ais-highlight__Sesa__/ais-highlight__me Street. Narrated by Whoopi Goldberg, this documentary includes rare archival footage, interviews with Frank Oz, Rosie O’Donnell, Cheryl Henson, Joan Ganz Cooney and others and offers a behind-the-scenes look at __ais-highlight__Sesa__/ais-highlight__me Street and the Jim Henson Workshop.",
          genres: ["Documentary", "Family"],
          poster: "https://image.tmdb.org/t/p/w500/7W2jIcJoWyMaYNiSkCxhZQX3OQF.jpg",
          release_date: "1319155200",
        },
      },
      {
        id: 288767,
        title: "Pixar Short Films Collection: Volume 1",
        overview:
          'Pixar\'s unprecedented string of hit animated features was built on the short films in this collection. John Lasseter and Ed Catmull used these cartoons the way Walt Disney used the "Silly Symphonies" during the 1930s: as a training ground for artists and a way to explore the potential of a new medium. Although it\'s only 90 seconds long, "Luxo, Jr." (1986) ranks as the "Steamboat Willie" of computer animation: For the first time, audiences believed CG characters could think and feel. (It was also the first CG film to make audiences laugh.) The long-unseen films for Sesame Street are an unexpected bonus.',
        genres: ["Family", "Animation"],
        poster: "https://image.tmdb.org/t/p/w500/uBFieq0YPvjsOXCoSrnXBS8LliF.jpg",
        release_date: 1174435200,
        _formatted: {
          id: "288767",
          title: "Pixar Short Films Collection: Volume 1",
          overview:
            'Pixar\'s unprecedented string of hit animated features was built on the short films in this collection. John Lasseter and Ed Catmull used these cartoons the way Walt Disney used the "Silly Symphonies" during the 1930s: as a training ground for artists and a way to explore the potential of a new medium. Although it\'s only 90 seconds long, "Luxo, Jr." (1986) ranks as the "Steamboat Willie" of computer animation: For the first time, audiences believed CG characters could think and feel. (It was also the first CG film to make audiences laugh.) The long-unseen films for __ais-highlight__Sesa__/ais-highlight__me Street are an unexpected bonus.',
          genres: ["Family", "Animation"],
          poster: "https://image.tmdb.org/t/p/w500/uBFieq0YPvjsOXCoSrnXBS8LliF.jpg",
          release_date: "1174435200",
        },
      },
    ],
    query: "sesa",
    processingTimeMs: 1,
    limit: 21,
    offset: 0,
    estimatedTotalHits: 7,
  }

  return mockResponse
})
