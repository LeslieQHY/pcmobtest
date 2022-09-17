import {
    ActivityIndicator,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
  } from "react-native";
  import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { API_STATUS, BUCKS_SCREEN } from "../constants";
import { fetchPosts } from "../features/bucksSlice";
import {StatusBar} from 'expo-status-bar'
import {Feather} from '@expo/vector-icons'
  
  export default function BucksScreenHome() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.bucks.posts);
  const bucksStatus = useSelector((state) => state.bucks.status);
  const isLoading = bucksStatus === API_STATUS.pending;
  const expenses = posts.map(post=>parseInt(post.price))
  const total = expenses.reduce(function (r, a) {
    return a < 0 ? r + a : r;
}, 0);
  const income = posts.map(post=>parseInt(post.price))
  const total2 = income.reduce(function (r, a) {
    return a > 0 ? r + a : r;
}, 0, );
  const remain = total2-Math.abs(total);
  
  useEffect(() => {
    if (bucksStatus === API_STATUS.idle) {
      dispatch(fetchPosts());
    }
  }, [bucksStatus, dispatch]);

  function renderItem({ item }) {
    return (
      <TouchableOpacity 
       style={styles.buckCard} 
       onPress={() => navigation.navigate(BUCKS_SCREEN.Details, item)}
       >
        <Text style={styles.buckCardTitle}>{item.title}</Text>
        <Text style={styles.buckCardBodyText}>
          ${item.price}
        </Text>
      </TouchableOpacity>
    );
  }
  return (

    <View style={styles.container}>
        <StatusBar style='dark' />
      <Text style={styles.title}>Little Wallet</Text>
      
      <View style ={styles.card}>

      <View style={styles.cardTop}>
      <Text style={{textAlign: 'center', color: 'aliceblue', fontSize: 40}}>
              Total Balance
            </Text>
            <Text style={{textAlign: 'center', color: 'aliceblue', fontSize: 30,
                    fontWeight: 'bold',}}>
              ${remain}
            </Text>
      </View>
      

      <View style={styles.cardBottom}>
      <Feather name='arrow-down' size={25} color='green' />
                
                <Text style={{ textAlign: 'center', marginLeft: 5, fontSize: 30, }}
                >Income 
                </Text>

                <Text style={{textAlign: 'center', color: 'green', fontSize: 30, fontWeight: 'bold' }}>
                ${total2}
                </Text>
      

      <View style={styles.cardBottomSame}>
      <Feather name='arrow-up' size={25} color='red'/>

                <Text style={{textAlign: 'center', marginLeft: 5, fontSize: 30}}>
                  Expense
                </Text>

                <Text style={{textAlign: 'center', color: 'red', fontSize: 30, fontWeight: 'bold'}}>
                 ${Math.abs(total)}
                </Text>
       </View>
       </View>
    </View>

      {isLoading && <ActivityIndicator />}

      <Text style={styles.past}>Recent Transaction</Text>
      <View style={{
    borderBottomColor: "black",
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginBottom: 20,
  }}
/>
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={(post) => post.id.toString()}
      />

      <View style={{ flex: 1 }} />
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate(BUCKS_SCREEN.Add)}
      >
        <Text style={styles.buttonText}>Add new transaction</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  buckCard: {
    borderColor: "gray",
    borderWidth: 1,
    padding: 15,
    borderRadius: 5,
    marginBottom: 15,
    width: "95%",
    justifyContent: "center",
    display: "flex",
    margin: "auto",
    backgroundColor:"white",
  },
  buckCardTitle: {
    fontSize: 20,
    fontWeight: 500,
    marginBottom: 7,
    alignItems: "center",
    display: "flex",
  },
  buckCardBodyText: {
    fontSize: 16,
    fontWeight: "300",
    justifyContent: "right",
    alignItems: "center",
    display: "flex",
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: "#e6dadd",
  },
  title: {
    height: 80,
    textAlign: "center",
    backgroundColor: "#42f5f5",
    fontSize: 32,
    justifyContent: "center",
    alignItems: 'center',
    padding: 14,
    marginBottom: 15,
  },
  past:{
    flex: 1,
    alignItems: "center",
    width:"50%",
    display: "flex",
    margin: "auto",
    justifyContent: "center",
    padding: 2,
    fontSize: 20,
    fontWeight: 500,
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
  card: {
    backgroundColor: "#535F93",
    alignItems: "center",
    width: "100%",
    padding: 10,
    borderRadius: 10,
    elevation: 4,
    marginVertical: 20,
  },
  cardTop: {
    marginBottom: 20,
  },
  cardBottom: {
    backgroundColor: "#E0D1EA",
    display:"flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: 10,
    borderRadius: 10,
    elevation: 4,
    marginVertical: 20,
  },
  cardBottomSame: {
    display:"flex",
    justifyContent:"center",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
    padding: 10,
    elevation: 4,
    marginVertical: 20,
  },
});
