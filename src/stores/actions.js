const url = 'https://simple-contact-crud.herokuapp.com/contact'
import { ToastAndroid } from 'react-native'

export const getContactFromApi = () => {
  return async (dispatch) => {
    fetch(url)
      .then(response => response.json())
      .then(result => {
        const contacts = result.data
        if(contacts) {
          contacts.sort((a, b) => {
            let firstNameA = a.firstName.toLowerCase(),
                firstNameB = b.firstName.toLowerCase();

            if (firstNameA < firstNameB) {
                return -1;
            }
            if (firstNameA > firstNameB) {
                return 1;
            }
            return 0;
          });
          dispatch({
            type: 'SET_CONTACTS',
            contacts
          })
        }
      })
    }
}

export const editContactById = (editedContact, id, navigation) => {
  console.log(id);
  return () => {
    fetch(`${url}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(editedContact)
    })
      .then(response =>  response.json())
      .then(result => {
        console.log( 'res',result);
        if(result.statusCode === 400) {
          ToastAndroid.showWithGravity(
            "Failed to update contact",
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
          )
        } else {
          navigation.navigate("HomeScreen")
        }
      })
      .catch(err => {
        console.log('err',err);
      })
  }
}

export const getContactByIdFromApi = (id) => {
  return (dispatch) => {
    fetch(`${url}/${id}`)
      .then(response => response.json())
      .then(result => {
        dispatch({
          type: 'SET_CONTACT',
          contact: result.data
        })
      })
  }
}

export const deleteContactById = (id, navigation) => {
  return () => {
    fetch(`${url}/${id}`, {
      method: 'DELETE'
    })
      .then(response => response.json())
      .then(res => {
        if(res.message === 'contact unavailable') {
          ToastAndroid.showWithGravity(
            "Failed to delete contact",
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
          )
        } else navigation.navigate("HomeScreen")
      })
      .catch(err => {
        console.log(err, 'err');
      })
  }
}

export const postContactToApi = (newContact, navigation) => {
  return async (dispatch) => {
    const sendDataToApi = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(newContact)
    })
    const response = await sendDataToApi.json()
    console.log(response);
  }
}