// Nomenclatura de variáveis

const categoriesList = [
  {
    title: 'User',
    followers: 5
  },
  {
    title: 'Friendly',
    followers: 50,
  },
  {
    title: 'Famous',
    followers: 500,
  },
  {
    title: 'Super Star',
    followers: 1000,
  },
]

export default async function getGithubUserWithCategory(req, res) {
  const githubUsername = String(req.query.username)

  if (!githubUsername) {
    return res.status(400).json({
      message: `Please provide an username to search on the github API`
    })
  }

  const userFetchResponse = await fetch(`https://api.github.com/users/${githubUsername}`);

  if (userFetchResponse.status === 404) {
    return res.status(400).json({
      message: `User with username "${githubUsername}" not found`
    })
  }

  const user = await userFetchResponse.json()

  const orderedCategoriesByMoreFollewrs = categoriesList.sort((a, b) =>  b.followers - a.followers); 

  const category = orderedCategoriesByMoreFollewrs.find(i => user.followers > i.followers)

  const result = {
    github: githubUsername,
    category: category.title
  }

  return result
}

getGithubUserWithCategory({ query: {
  username: 'brsantos197'
}}, {})