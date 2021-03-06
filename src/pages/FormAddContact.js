import React, { useState } from 'react'
import { StyleSheet, Text, View, ToastAndroid } from 'react-native';
import { Container, Content, Form, Item, Input, Label, Button } from 'native-base';
import { useDispatch } from 'react-redux'
import { postContactToApi, getContactFromApi } from '../stores/actions';

export const FormAddContact = ({navigation}) => {
  const dispatch = useDispatch()
  const [input, setInput] = useState({
    firstName: '',
    lastName: '',
    age: 0,
    photo: 'N/A'
  })

  const updateField = async (e) => {
    if(input.photo === '') {
      setInput({
        ...input,
        photo: 'N/A'
      })
    }
    if(input.firstName === '' || input.lastName === '' || input.age < 1 ) {
      ToastAndroid.showWithGravity(
        "Please input field with '*'",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      )
    } else if(input.firstName.length < 2 || input.lastName.length < 2) {
      ToastAndroid.showWithGravity(
        "Minimum 3 characters for first name and last name",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      )
    } else {
      await dispatch(postContactToApi(input, navigation))
      await dispatch(getContactFromApi())
      navigation.navigate("HomeScreen")
    }
  }

  return (
    <Container>
      <Content style={styles.contentBg}>
        <Form>
          <Item floatingLabel>
            <Label style={styles.whiteColor}>First Name *</Label>
            <Input
              textContentType='givenName'
              style={styles.whiteColor}
              onChangeText= { e => {
                setInput({
                  ...input,
                  firstName: e
                })}
              }
            />
          </Item>
          <Item floatingLabel>
            <Label style={styles.whiteColor}>Last Name *</Label>
            <Input
              textContentType='familyName'
              style={styles.whiteColor}
              onChangeText= { e => {
                setInput({
                ...input,
                lastName: e
                })}
              }
            />
          </Item>
          <Item floatingLabel>
            <Label style={styles.whiteColor}>Photo Url</Label>
            <Input
              textContentType='URL'
              keyboardType='web-search'
              style={styles.whiteColor}
              onChangeText= { e => {
                setInput({
                ...input,
                photo: e
                })}
              }
            />
          </Item>
          <Item floatingLabel>
            <Label style={styles.whiteColor}>Age *</Label>
            <Input
              keyboardType='number-pad'
              style={styles.whiteColor}
              onChangeText= { e => {
                setInput({
                ...input,
                age: e
                })}
              }
            />
          </Item>

          <View style={styles.btnGroup}>
            <Button transparent onPress={updateField}>
              <Text style={styles.saveBtn}>Save</Text>
            </Button>
            <Button transparent onPress={() => {
              navigation.navigate("HomeScreen")
            }}>
              <Text style={styles.cancelBtn}>Cancel</Text>
            </Button>
          </View>
        </Form>
      </Content>
    </Container>
  )
}

const styles = StyleSheet.create({
  contentBg: {
    backgroundColor: '#484d5c'
  },
  whiteColor: {
    color: 'white'
  },
  btnGroup: {
    flexDirection: 'row',
    margin: 10,
    padding: 10
  },
  saveBtn: {
    color: '#ADD8E6',
    padding: 10,
    fontSize:20
  },
  cancelBtn: {
    color: '#FE2E2E',
    padding: 10,
    fontSize:20
  }
})