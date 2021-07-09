import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'posts')
console.log("posts directory" +postsDirectory)

export function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory)
  console.log("file names" +fileNames)
  const allPostsData = fileNames.map(fileName => {
    // Remove ".md" from file name to get id
    console.log("file name" +fileName)
    const id = fileName.replace(/\.md$/, '')
    console.log(id)
    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName)
    console.log("fullpath" +fullPath)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    console.log("file contents" +fileContents)
    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)

    console.log("matter result" +matterResult)
    // Combine the data with the id
    return {
      id,
      ...matterResult.data
    }
  })
  // Sort posts by date
  return allPostsData.sort(({ date: a }, { date: b }) => {
    if (a < b) {
      return 1
    } else if (a > b) {
      return -1
    } else {
      return 0
    }
  })
}
