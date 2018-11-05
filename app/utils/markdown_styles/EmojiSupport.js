import emoji from 'emoji-dictionary';

export default text =>
  text.children.replace(/:\w+:/gi, name => emoji.getUnicode(name));
