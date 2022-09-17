import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { nanoid } from "@reduxjs/toolkit";	
import { useDispatch } from "react-redux";	
import { addNewPost } from "../features/bucksSlice";

export default function BucksScreenAdd() {
  const navigation = useNavigation();
  const [buckTitle, setBuckTitle] = useState("");
  const [buckBody, setBuckBody] = useState("");
  
  const dispatch = useDispatch();

  const canSave = [buckTitle, buckBody].every(Boolean);	
  async function savePost() {	
    if (canSave) {	
      try {	
        const post = {	
          id: nanoid(),	
          title: buckTitle,	
          price: buckBody,	
        };	
        await dispatch(addNewPost(post));	
      } catch (error) {	
        console.error("Failed to save the post: ", error);	
      } finally {	
        navigation.goBack();	
      }	
    }	
  }

  return (
     <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <FontAwesome name={"arrow-left"} size={24} color={"black"} />
      </TouchableOpacity>

      <Text style={styles.baseText}>
      Add new transaction
    </Text>
    <View style={{
    borderBottomColor: "black",
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginBottom: 20,
  }}
/>
      <TextInput
        style={styles.buckTitle}
        placeholder={"Enter description here"}
        value={buckTitle}
        onChangeText={(text) => setBuckTitle(text)}
        selectionColor={"blue"}
      />
      <TextInput
        style={styles.buckBody}
        type= "number"
        placeholder={"Amount"}
        value={buckBody}
        onChangeText={(text) => setBuckBody(text)}
        selectionColor={"gray"}
      />

<Text style={styles.baseText2}>
      Note
    </Text>
    <Text style={{ fontSize: 20 }}>{`\u2022 For Income, Enter amount in Positive.`}</Text>
    <Text style={{ fontSize: 20 }}>{`\u2022 For Expense, Enter amount in Negative.`}</Text>
      <View style={{ flex: 1, }} />
      
      <TouchableOpacity style={styles.button} 
      onPress={async () => await savePost ()}>
        <Text style={styles.buttonText}>Add Transaction</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e6dadd",
    paddingTop: 60,
    padding: 25,
  },
  buckTitle: {
    borderColor: "gray",
    borderWidth: 1,
    padding: 15,
    borderRadius: 5,
    marginBottom: 15,
    width: "100%",
    justifyContent: "left",
    display: "flex",
    margin: "auto",
    backgroundColor:"white",
    fontSize: 30,
  },
  buckBody: {
    borderColor: "gray",
    borderWidth: 1,
    padding: 15,
    borderRadius: 5,
    marginBottom: 15,
    width: "100%",
    justifyContent: "center",
    display: "flex",
    margin: "auto",
    backgroundColor:"white",
    fontSize: 25,
  },
  button: {
    backgroundColor: "black",
    borderRadius: 15,
    width: "100%",
  },
  buttonText: {
    textAlign: "center",
    fontWeight: 400,
    fontSize: 17,
    padding: 20,
    color: "white",
  },
  baseText:{
    fontSize: 42,
    fontWeight: 600,
    marginTop: 30,
    marginBottom: 25,
  },
  baseText2:{
    fontSize: 30,
    fontWeight: 600,
    marginTop: 30,
    marginBottom: 25,
  }
});