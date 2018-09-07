/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ActivityIndicator, Image} from 'react-native';
import {RandManager} from './RandManager'
import Swiper from 'react-native-swiper'

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});
const NUM_WALLPAPERS = 5;
type Props = {};
export default class App extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {text: '', isLoading: true, imagesJSON: []};
    }

    fetchImagesJSON() {
        fetch('http://unsplash.it/list')
            .then((response) => response.json())
            .then((jsonData) => {console.log(jsonData);
                let randomIds = RandManager.uniqueRandomNumbers(NUM_WALLPAPERS, 0, jsonData.length);
                let images = [];
                randomIds.forEach(randomId => {
                    images.push(jsonData[randomId]);
                });
                this.setState({isLoading:false, imagesJSON: [].concat(images)})})
            .catch( error => console.log('Fetch error'  + error) );
    }

    renderLoadingMessage() {
        return (
            <View style={styles.loadingContainer}>
            <ActivityIndicator
                animating={true}
                color={'#fff'}
                size={'small'}
                style={{margin: 15}} />
            <Text style={{color: '#fff'}}>Contacting Unsplash</Text>

            </View>
    );
    }

    componentDidMount() {
        this.fetchImagesJSON();
    }

    renderResults() {
        let imagesJSON=this.state.imagesJSON, isLoading=this.state.isLoading;
        if (!isLoading) {
            return (
                <View>
                    <Swiper
                        dot.{<View style={{backgroundColor:'rgba(255,255,255,.4)', width: 8, height: 8,borderRadius: 10, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,}} />}

                        activeDot.{<View style={{backgroundColor: '#fff', width: 13, height: 13, borderRadius: 7, marginLeft: 7, marginRight: 7}} />}

                        loop={false}

                        onMomentumScrollEnd={this.onMomentumScrollEnd}
                    >
                    {imagesJSON.map((image, index) =>{
                        return (
                            <View>
                            <Text key={index}>
                                {image.author}
                            </Text>
                            <Image source=image.post_url />
                            </View>
                        )
                    })}
                    </Swiper>
                </View>
            );
        }
    }

    render() {
        if(this.state.isLoading)
            return this.renderLoadingMessage();
        else
            return this.renderResults();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  loadingContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#000'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
