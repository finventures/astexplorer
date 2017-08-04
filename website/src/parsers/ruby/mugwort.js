import defaultParserInterface from '../utils/defaultParserInterface';
const ID = 'mugwort';
import pkg from 'mugwort/package.json';

export default {
  ...defaultParserInterface,
  id: ID,
  displayName: ID,
  version: pkg.version,
  homepage: pkg.homepage,
  locationProps: new Set(['loc']),
  loadParser(callback) {
    require(['mugwort'], callback);
  },

  parse(module, code, options) {
    const Engine = module.default;
    const parser = new Engine({ ...options });
    return parser.parseCode(code, '');
  },

  getNodeName(node) {
    return node.kind;
  },

  nodeToRange(node) {
    if (node.loc && node.loc.start && node.loc.end) {
      return [node.loc.start.offset, node.loc.end.offset];
    }
  },

  opensByDefault(node, key) {
    return key === 'body' || key === 'what' || key === 'items';
  },
};
