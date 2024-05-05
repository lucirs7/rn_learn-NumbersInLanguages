import { StyleSheet, Text, View, Image, SafeAreaView, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';
import { useEffect, useState } from 'react';

const backgroundColourList = {
  1: '#008b8b',
  2: '#48d1cc',
  3: '#ffb6c1',
  4: '#8b008b',
  5: '#c71585',
  6: '#dc143c',
  7: '#ff4500',
  8: '#ffd700',
  9: '#adff2f',
  10: '#6b8e23',
};

type SoundAsset = any;

const soundList: {[key: string]: SoundAsset} = {
  one: require('./src/assets/one.wav'),
  two: require('./src/assets/two.wav'),
  three: require('./src/assets/three.wav'),
  four: require('./src/assets/four.wav'),
  five: require('./src/assets/five.wav'),
  six: require('./src/assets/six.wav'),
  seven: require('./src/assets/seven.wav'),
  eight: require('./src/assets/eight.wav'),
  nine: require('./src/assets/nine.wav'),
  ten: require('./src/assets/ten.wav'),
};

export default function App() {
  const [sound, setSound] = useState<Audio.Sound>();

  const playSound = async (number: string) => {
    const soundObj = new Audio.Sound();

    try {
      let path = soundList[number];
      await soundObj.loadAsync(path);
      setSound(soundObj);
      await soundObj.playAsync();/*.then(async playbackStatus => {
        if (playbackStatus.isLoaded) {
          soundObj.unloadAsync();
        }
      }).catch(error => {
        console.error('An error occurred during unloading sound: ', error);
      });*/
    } catch (error) {
      console.error('An error occurred while playing the sound: ', error);
    }
  };

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.screenView}>
        <View style={styles.gridContainer}>
          <Image style={styles.logo} source={require('./src/assets/logo.png')} />
          <View style={styles.rowContainer}>
            <TouchableOpacity
              style={{...styles.item, backgroundColor:backgroundColourList[1]}}
              onPress={() => playSound('one')}
              >
                <Text style={styles.itemText}>1</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  screenView: {
    marginTop: 16,
    flex: 1,
  },
  gridContainer: {
    flex: 1,
    margin: 8,
  },
  logo: {
    alignSelf: 'center',
  },
  rowContainer: {
    flexDirection: 'row',
  },
  item: {
    flex: 1,
    height: 110,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 2,
  },
  itemText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
});
