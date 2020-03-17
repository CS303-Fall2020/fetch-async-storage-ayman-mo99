import React from "react";
import { Modal, View, Image, Text, Button, StyleSheet,TextInput,TouchableWithoutFeedback,Keyboard } from "react-native";

let neww = "oooooooooooooo";
  

const placeDetail = props => {
  let modalContent = null;
  
  function change (val){
  
    neww = val;
    //console.log(val);
   }


  if (props.selectedPlace) {
    modalContent = (
      <View>
        <Image source={props.selectedPlace.image} style={styles.placeImage} />
        <Text style={styles.placeName}>{props.selectedPlace.name}</Text>
      </View>
    );
  }
  return (
    <Modal
      onRequestClose={props.onModalClosed}
      visible={props.selectedPlace !== null}
      animationType="slide"
    >
      
      <View style={styles.modalContainer}>
        {modalContent}
        <View>
          <Button title="Delete" color="red" onPress={props.onItemDeleted} />
          <Button title="Close" onPress={props.onModalClosed} />          
        
        </View>

        <View style={styles.inputContainer}>

        <TextInput
          placeholder="change"
          multiline
          onChangeText={change}
          style={styles.placeInput}
        />
        
        <Button
          title="save"
          onPress={ ()=>props.onchanged(neww,props.selectedPlace.key)}   
          style={styles.placeButton}
          
        />
      </View>

      </View>

      
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    margin: 22
  },
  placeImage: {
    width: "100%",
    height: 200
  },
  placeName: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 28
  },
  inputContainer: {
    // flex: 1,
    marginTop:25,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  placeInput: {
    width: "70%"
  },
  placeButton: {
    width: "30%"
  }
});

export default placeDetail;
