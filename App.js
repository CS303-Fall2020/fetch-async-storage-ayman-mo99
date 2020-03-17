import React, { Component } from "react";
import {AsyncStorage, StyleSheet, View,Text,Alert,TouchableWithoutFeedback,Keyboard, ActivityIndicator ,Button} from "react-native";

import PlaceInput from "./src/components/PlaceInput/PlaceInput";
import PlaceList from "./src/components/PlaceList/PlaceList";
import PlaceDetail from "./src/components/PlaceDetail/PlaceDetail";
import image from './src/assets/pho.jpg';
//import placeList from "./src/components/PlaceList/PlaceList";



export default class App extends Component {

  constructor(){
    super();
  this.state = {
    places: [],
    selectedPlace: null,
    try:true,
    isloading:true,
    error:false
  };
}
  //https://jsonplaceholder.typicode.com/posts

  re = ()=>{
    this.setState({isloading:true});
   this.componentWillMount();

  }
componentWillMount = async () => {
  
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos?userId=1')
    const posts = await response.json()

    var te=[];
    for(var i=0 ; i<posts.length ; i++){
          te[i]={key:posts[i].id , name:posts[i].title , image:image } ;
          }
          this.setState({ places: te }); 
 this.setState({isloading: false/*, places:posts*/})

  } catch (e) {
    this.setState({isloading: false, error: true})

    console.log("errrr");
  }
    
  
  await AsyncStorage.setItem('products', JSON.stringify(this.state.places) )
  .then(  ()=> {console.log('It was saved successfully')} )
  .catch( ()=> {console.log('There was an error saving the product') } )

  const existingProducts = await AsyncStorage.getItem('products')
  var w=JSON.parse(existingProducts);
  //console.log(w[0].name);
 
  if(this.state.error){

    this.setState({ places: w });

  }

}

 

  placeAddedHandler = async(placeName) => {
    this.setState(prevState => {
      return {
        places: prevState.places.concat({
          key: Math.random(),
          name: placeName,
          image: image /* {
            uri:
              "https://c1.staticflickr.com/5/4096/4744241983_34023bf303_b.jpg"
          }*/
        })
      };
    });
    await AsyncStorage.setItem('products', JSON.stringify(this.state.places) )
  .then(  ()=> {console.log('It was saved successfully')} )
  .catch( ()=> {console.log('There was an error saving the product') } )
  };

   placechange = async(val,key) => {
   // var i = 0;
   var te = [];
   console.log(this.state.places);
   if(val!==""){
    for(var i=0 ; i<this.state.places.length ; i++){
      if(this.state.places[i].key==key){
        //console.log(this.state.places[i].name);
          this.state.places[i].name=val;
          te[i]={key:key,name:val,image:image } ;
          this.setState({ state: this.state });
       // console.log(this.state.places[i].name);
        //this.setState({ state: this.state });
        
      }  
      else{
        te[i]=this.state.places[i];
      }

    }
    this.setState({ places: te });
   }else{
    Alert.alert('oooops   anything pls ....');
   }
   
   
   //console.log(this.state.places);
   await AsyncStorage.setItem('products', JSON.stringify(this.state.places) )
   .then(  ()=> {console.log('It was saved successfully')} )
   .catch( ()=> {console.log('There was an error saving the product') } )

  };

  placeDeletedHandler = async() => {
    this.setState(prevState => {
      return {
        places: prevState.places.filter(place => {
          return place.key !== prevState.selectedPlace.key;
        }),
        selectedPlace: null
      };
    });

    await AsyncStorage.setItem('products', JSON.stringify(this.state.places) )
    .then(  ()=> {console.log('It was saved successfully')} )
    .catch( ()=> {console.log('There was an error saving the product') } )


  };

  modalClosedHandler = () => {
   // this.setState({ state: this.state });
    this.setState({
      places:this.state.places,
      selectedPlace: null
      
    });
         
    this.setState({ try: true });
   

  };

  placeSelectedHandler = key => {
    this.setState(prevState => {
      return {
        selectedPlace: prevState.places.find(place => {
          return place.key === key;
        })
      };
    });
  };

  render() {
    
     // <TouchableWithoutFeedback onPress={()=> {console.log("hi"); Keyboard.dismiss()}}>
     if(this.state.isloading){

      return (

        <View style={styles.container}>

          <ActivityIndicator/>
        </View>
      );

     }
     else{
     if(this.state.error){
      return (
      <View style={styles.container}>
           
      <PlaceDetail
        selectedPlace={this.state.selectedPlace}
        onItemDeleted={this.placeDeletedHandler}
        onModalClosed={this.modalClosedHandler}
        onchanged={this.placechange}
      />

      <Text style={styles.top} >Todos</Text>

      <PlaceInput onPlaceAdded={this.placeAddedHandler} />
      <Text style={styles.top} >no internt</Text>
      <Button
        title="try refresh"
        /*style={styles.placeButton}*/
        onPress={this.re}
      />
      <PlaceList
        places={this.state.places}
        onItemSelected={this.placeSelectedHandler}
      />
    </View>
    );


     }
      else{

        return (
          <View style={styles.container}>
           
            <PlaceDetail
              selectedPlace={this.state.selectedPlace}
              onItemDeleted={this.placeDeletedHandler}
              onModalClosed={this.modalClosedHandler}
              onchanged={this.placechange}
            />
    
            <Text style={styles.top} >Todos</Text>
    
            <PlaceInput onPlaceAdded={this.placeAddedHandler} />
            <Button
              title="refresh"
              /*style={styles.placeButton}*/
              onPress={this.re}
            />
            <PlaceList
              places={this.state.places}
              onItemSelected={this.placeSelectedHandler}
            />
          </View>
          );

      }
     
     }
      //</TouchableWithoutFeedback>
    
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 26,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start"
  },
  top: {
    //marginTop: 0,
    textAlign: 'center',
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 25,
    //paddingTop:20,
    //paddingBottom:20,
    //backgroundColor: 'black'
    }
});
