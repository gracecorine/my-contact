import React, { useEffect } from 'react'
import { View, StyleSheet, Text, Image, Dimensions, ActivityIndicator } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { Card, CardItem, Icon, Button } from 'native-base'
import { deleteContactById, getContactByIdFromApi } from '../stores/actions'

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export const DetailContact = ({navigation, route}) => {

  const dispatch = useDispatch()
  const { contact } = useSelector(state => state.contactReducers)
  const { id } = route.params

  useEffect(() => {
    dispatch(getContactByIdFromApi(id))
  }, [dispatch])

  const handleDelBtn = () => {
    dispatch(deleteContactById(id, navigation))
  }

  const handleEditBtn = () => {
    navigation.navigate("FormUpdateContact", { contact })
  }

  if(contact.id !== id) {
    return (
      <View style={styles.bgLoading}>
        <ActivityIndicator style={styles.activityIndicator} size="large" color="#0000ff" />
      </View>
    )
  }

  return (
    <View style={styles.bgBody}>
      {
        contact.photo !== "N/A"  ?
        <Image
          source={{
            uri: contact.photo
          }}
          style={styles.image}
        >
        </Image>
        : <Icon name="people" style={styles.icon} />
      }
      <Card style={styles.card}>
        <CardItem bordered style={styles.bgCardItem}>
          <Text style={styles.fontSizeName}>
            {`${contact.firstName} ${contact.lastName}`}
          </Text>
        </CardItem>

        <CardItem style={styles.bgCardItem}>
          <Text style={styles.fontSizeAge}>
            {contact.age} Years Old
          </Text>
        </CardItem>
      </Card>

      <View style={styles.btnView}>
        <Button iconLeft danger
          onPress= {handleDelBtn}
        >
          <Icon name='trash' />
          <Text style={styles.delBtn}>Delete Contact</Text>
        </Button>

        <Button iconLeft info
          onPress = {handleEditBtn}
        >
          <Icon name='cog' />
          <Text style={styles.editBtn}>Edit Contact</Text>
        </Button>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  activityIndicator: {
    marginVertical: windowHeight / 2,
    marginHorizontal: windowWidth / 2
  },
  bgLoading: {
    backgroundColor: '#5A5E6C'
  },
  bgBody: {
    backgroundColor: '#484d5c',
    height: windowHeight
  },
  image: {
    width: 200, height:200,
    borderRadius: 100,
    marginHorizontal: (windowWidth - 220)/2,
    borderWidth: 2,
    borderColor: 'white',
    marginVertical: 30
  },
  icon: {
    fontSize: 200,
    marginHorizontal: (windowWidth - 200)/2,
    marginVertical: 30,
    color: 'black'
  },
  card: {
    padding: 10,
    marginLeft: 35,
    marginRight: 35,
    backgroundColor: '#8B8E98'
  },
  bgCardItem: {
    backgroundColor: '#8B8E98'
  },
  fontSizeName: {
    fontSize: 25
  },
  fontSizeAge: {
    fontSize: 20
  },
  btnView: {
    marginLeft: 35,
    marginTop:35,
    marginRight:35,
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  delBtn: {
    fontSize:20,
    fontWeight: 'bold',
    color: 'white',
    padding: 15
  },
  editBtn: {
    fontSize:20,
    fontWeight: 'bold',
    color: 'white',
    padding: 15
  }
})