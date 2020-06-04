import React from 'react';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {
  StyleSheet,
  View,
  Button,
  Image,
  TextInput,
  FlatList,
  Text,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import {db} from './src/config/firebase';

export default class App extends React.Component {
  state = {
    name: '',
    latitude: '',
    longitude: '',
    data: [],
  };

  componentDidMount() {
    this.listenData();
  }

  addData = (name, latitude, longitude) => {
    try {
      db.ref('/data-name').push({
        name,
        latitude,
        longitude,
      });
      ToastAndroid.show('Sukses!', ToastAndroid.SHORT);
    } catch (error) {
      ToastAndroid.show('Gagal!', ToastAndroid.SHORT);
    }
  };

  handleSend = () => {
    const {name, latitude, longitude} = this.state;
    this.addData(name, latitude, longitude);
    this.setState({name: '', latitude: '', longitude: ''});
  };

  listenData = () => {
    let itemsRef = db.ref('/data-name');
    itemsRef.on('value', (res) => {
      let data = res.val();
      const objectArray = Object.values(data);
      this.setState({data: objectArray});
    });
  };

  handleMove = () => {
    this.refs.map.animateToRegion(
      {
        latitude: -6.6854096,
        longitude: 106.8672646,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      },
      3000,
    );
  };

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <MapView
            ref="map"
            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            style={styles.map}
            initialRegion={{
              latitude: -6.607607,
              longitude: 106.8012276,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            }}>
            {this.state.data.map((item, index) => {
              return (
                <Marker
                  title={item.name}
                  coordinate={{
                    latitude: parseFloat(item.latitude),
                    longitude: parseFloat(item.longitude),
                  }}>
                  <Image
                    source={{
                      uri:
                        'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png',
                    }}
                    style={styles.image}
                  />
                </Marker>
              );
            })}
          </MapView>
          <TextInput
            onChangeText={(text) => {
              this.setState({name: text});
            }}
            placeholder="Masukkan nama"
            value={this.state.name}
          />
          <TextInput
            onChangeText={(text) => {
              this.setState({latitude: text});
            }}
            placeholder="Masukkan latitude"
            value={this.state.latitude}
          />
          <TextInput
            onChangeText={(text) => {
              this.setState({longitude: text});
            }}
            placeholder="Masukkan longitude"
            value={this.state.longitude}
          />
          <Button onPress={this.handleSend} title="Kirim" />
          <FlatList
            data={this.state.data}
            renderItem={({item, index}) => {
              return (
                <Text>
                  {' '}
                  {index + 1} {item.name}{' '}
                </Text>
              );
            }}
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  map: {
    height: 400,
    width: '100%',
  },
  image: {
    height: 50,
    width: 50,
    borderRadius: 25,
    borderWidth: 3,
    borderColor: 'green',
  },
});
