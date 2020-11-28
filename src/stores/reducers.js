const initContact = {
  contacts: [],
  contact: {}
}

const contactReducers = (state = initContact, action) => {
  switch (action.type) {
    case 'SET_CONTACTS':
      return { ...state, contacts: action.contacts}
    case 'SET_CONTACT':
      return { ...state, contact: action.contact}
    default:
      return state;
  }
}

export default contactReducers