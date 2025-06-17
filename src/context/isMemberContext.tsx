function memberContext() {
  let isMember = false;

  function setIsMember(newValue: null | boolean = null) {
    if (newValue == null) return isMember;
    isMember = newValue;
    return isMember;
  }

  return setIsMember;
}

export default memberContext();
