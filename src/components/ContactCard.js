import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { ListItem, Icon } from 'native-base';

export const ContactCard = ( { contact, navigation } ) => {

  const fullName = `${contact.firstName} ${contact.lastName}`

  return (
    <View>
      <ListItem onPress={() => {
        navigation.navigate("DetailContact", {id: contact.id})
      }}>
        {
          contact.photo !== "N/A" ?
          <Image
          style={styles.image}
          source = {{
            uri: contact.photo
          }}
        />
        : <Icon name="people" style={styles.icon} />
        }
        <Text style={styles.fullName}>{fullName}</Text>
      </ListItem>
    </View>
  )
}

const styles = StyleSheet.create({
  fullName: {
    fontSize: 20,
    marginLeft: 20,
    color: 'white'
  },
  icon: {
    color: 'white',
    marginRight: 10
  },
  image: {
    width: 40,
    height:40,
    borderRadius: 20
  }
})