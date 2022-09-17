import { FontAwesome } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch } from "react-redux";
import { deletePostThunk, updatePostThunk } from "../features/bucksSlice";

export default function BucksScreenDetails() {
  const route = useRoute();
  const titleInputRef = useRef();
  const bodyInputRef = useRef();
  const navigation = useNavigation();
  const params = route.params;
  const [buckTitle, setBuckTitle] = useState(params.title);
  const [buckBody, setBuckBody] = useState(params.price);
  const [editable, setEditable] = useState(false);
  const dispatch = useDispatch();
  const id = params.id;

  async function updatePost(id) {	
    try {	
      const updatedPost = {	
        id,	
        title: buckTitle,	
        price: buckBody,	
      };	
      await dispatch(updatePostThunk(updatedPost));	
    } catch (error) {	
      console.error("Failed to update the post: ", error);	
    } finally {	
      navigation.goBack();	
    }	
  }
  async function deletePost(id) {	
    try {	
      await dispatch(deletePostThunk(id));	
    } catch (error) {	
      console.error("Failed to update the post: ", error);	
    } finally {	
      navigation.goBack();	
    }	
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome name={"arrow-left"} size={24} color={"black"} />
        </TouchableOpacity>

        <View style={{ flex: 1 }} />

        <TouchableOpacity
          onPress={() => {
            setEditable(!editable);
            if (!editable) {
              setTimeout(() => titleInputRef.current.focus(), 100);
            } else {
              setTimeout(() => titleInputRef.current.blur(), 100);
            }
          }}
        >
          <FontAwesome
            name={"pencil"}
            size={24}
            color={editable ? "forestgreen" : "black"}
          />
        </TouchableOpacity>

        <TouchableOpacity 
         onPress={() => deletePost(id)}
         style={{ marginLeft: 15 }}>
          <FontAwesome name={"trash"} size={24} color={"black"} />
        </TouchableOpacity>

      </View>
      <Text style={styles.baseText}>
      Edit your transaction 
    </Text>
    <View style={{
    borderBottomColor: "black",
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginBottom: 20,
  }}
/>
      <TextInput
        style={styles.buckTitle}
        placeholder={"buck title"}
        value={buckTitle}
        onChangeText={(text) => setBuckTitle(text)}
        selectionColor={"gray"}
        editable={editable}
        ref={titleInputRef}
      />
      <TextInput
        style={styles.buckBody}
        placeholder={"Add your bucks"}
        value={buckBody}
        onChangeText={(text) => setBuckBody(text)}
        selectionColor={"gray"}
        editable={editable}
        ref={bodyInputRef}
      />
      <Text style={styles.baseText2}>
      Note
    </Text>
    <Text style={{ fontSize: 20 }}>{`\u2022 For Income, Enter amount in Positive.`}</Text>
    <Text style={{ fontSize: 20 }}>{`\u2022 For Expense, Enter amount in Negative.`}</Text>
      <View style={{ flex: 1, }} />

      <View style={{ flex: 1 }} />
      <TouchableOpacity 
       style={styles.button}
       onPress={async () => updatePost(id)}
       >
        <Text style={styles.buttonText}>Save</Text>
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
    justifyContent: "left",
    display: "flex",
    margin: "auto",
    backgroundColor:"white",
    fontSize: 25,
  },
  button: {
    backgroundColor: "black",
    borderRadius: 15,
    width: "100%",
    marginBottom: 20,
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