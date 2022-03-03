const books = [
  {
    title: 'HTML5 up and running',
    author: 'Mark Pilgrim',
    id: "5e17c2a4e4571f2eaaee4ee7",
    description: "This book provides practical information about how and why the latest version of HTML5 markup language will significantly change the way you develop for the Web. The book provides your first real look at HTML5's new elements and attributes and carefully guides you though the important changes in this version with lots of hands-on examples, including markup, graphics, and screenshots. You'll learn how to use HTML5 markup to add video, offline capabilities, offer a drawing canvas for dynamically generated 2D graphics and more – and you’ll be able to put that functionality to work right away.",
  },
  {
    title: 'HTML5 & CSS3',
    author: 'Brian P. Hogan',
    id: "5e17c2cee4571f2eaaee4ee8",
    description: "This book gets you up to speed on the new HTML5 elements and CSS3 features you can use right now, and backwards compatible solutions ensure that you don\'t leave users of older browsers behind. It gets you started working with many useful new features of HTML and CSS right away. Gone are the days of adding additional markup just to style a button differently or stripe tables.",
  },
  {
    title: 'React by example',
    author: 'William Sheakspear',
    id: "5e17c2f3e4571f2eaaee4ee9",
    description: 'Example book description',
  },
  {
    title: 'React in action',
    author: ' Mark Tielens Thomas',
    id: "5e17c240e4571f2eaaee4ee6",
    description: 'Example description.',
  },
  {
    title: 'Fullstack with React.js',
    author: 'Fullmetal',
    id: "5e17c30fe4571f2eaaee4eea",
    description: 'Example book description',
  }
]

const getAll = () => Promise.resolve(books)

export default {
  getAll,
}
