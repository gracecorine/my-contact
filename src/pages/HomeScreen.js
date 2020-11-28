import React, { useEffect } from 'react'
import { View, Text, ActivityIndicator, FlatList, Dimensions, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux'
import { getContactFromApi } from '../stores/actions.js'
import { ContactCard } from '../components/ContactCard.js'
import { Container, Header, Button, Body, Icon } from 'native-base';

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

export const HomeScreen = ({navigation}) => {
  const dispatch = useDispatch()
  const { contacts } = useSelector(state => state.contactReducers)

  useEffect(() => {
    dispatch(getContactFromApi())
  }, [dispatch])

  if(contacts.length === 0 || contacts === undefined) {
    return (
      <View>
        <ActivityIndicator style={[styles.activityIndicator, styles.bgColor]} size="large" color="#0000ff" />
      </View>
    )
  }

  return (
    <Container>
      <Header style={styles.bgColor}>
        <Body style={styles.flexRow}>
          <Icon name="people" style= {styles.icon} />
          <Text style={styles.headerText}> My Contact</Text>
        </Body>
      </Header>

      <Container style={styles.bgContainer}>
          <FlatList
            style={{padding: 20}}
            data= {contacts}
            renderItem = { ({item}) => {
              return <ContactCard contact={item} navigation={navigation} alphabet={item.firstName[0]}/>
            }}
            keyExtractor={(contact)=> `${contact.id}`}
          />

          <View style={styles.btnAddContact}>
            <Button light rounded onPress={() => {
              navigation.navigate("FormAddContact")
              }}
            >
              <Icon name='add' />
            </Button>
          </View>
      </Container>
    </Container>
  )
}

const styles = StyleSheet.create({
  activityIndicator: {
    marginVertical: windowHeight / 2,
    marginHorizontal: windowWidth / 2
  },
  icon: {
    color: 'white',
    marginRight: 10
  },
  bgColor: {
    backgroundColor: '#5A5E6C'
  },
  flexRow: {
    flexDirection: 'row'
  },
  headerText: {
    fontSize: 25,
    color:"white",
    fontWeight: 'bold'
  },
  bgContainer: {
    backgroundColor: '#484d5c'
  },
  btnAddContact: {
    flexDirection: 'row-reverse',
    margin: 25
  }
})