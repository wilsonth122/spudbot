const { compose, removeStr } = require("./utils.js")

const ID_REGEX = /<@\S*>/
const SPUD_REGEX = /:spud:/g

const parseId = id =>
  compose(
    str => removeStr(str, "<@"),
    str => removeStr(str, ">")
  )(id);

const findUserIDs = message => {
  let matches = message.match(ID_REGEX)
  let userIDs = null

  if(matches) {
    userIDs = matches.map(
      id => parseId(id)
    );
  }

  return userIDs
};

const parseUserHandles = ids => {
  let userHandles = ids.map(
    id => "<@" + id + ">"
  )

  return userHandles
}

const findSpuds = message => message.match(SPUD_REGEX).length

module.exports = {
  findUserIDs,
  parseUserHandles,
  findSpuds
}
