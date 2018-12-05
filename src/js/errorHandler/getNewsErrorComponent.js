import createNewComponent from '../createComponent'

export default () => {
  let component;
  if (component) {
    return component
  }
  component = createNewComponent({
    urlToImage: 'https://static.seekingalpha.com/uploads/2012/6/23/261750-13404618131438339-George-Acs.jpg',
    title: 'Error',
    description: `You can't get news  in right now. Please try again in a 2 minutes.`,
    author: ''
  });
  return component
}