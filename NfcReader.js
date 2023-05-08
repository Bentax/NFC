import React, { useState, useEffect } from 'react';
import { Text, View, Platform, TouchableOpacity } from 'react-native';
import NfcManager, { NfcEvents } from 'react-native-nfc-manager';

const NfcReader = () => {
  const [tag, setTag] = useState(null);

  useEffect(() => {
    if (Platform.OS === 'android') {
      NfcManager.start();
    }

    NfcManager.setEventListener(NfcEvents.DiscoverTag, handleTagDiscovery);

    return () => {
      NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
      NfcManager.unregisterTagEvent();
    };
  }, []);

  const handleTagDiscovery = async (tag) => {
    setTag(tag);
    await NfcManager.unregisterTagEvent();
  };

  const readTag = async () => {
    try {
      await NfcManager.registerTagEvent();
    } catch (ex) {
      console.warn('Error while reading NFC tag', ex);
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={readTag}>
        <Text>Read RFID data</Text>
      </TouchableOpacity>
      {tag ? (
        <View>
          <Text>RFID data:</Text>
          <Text>{tag.id}</Text>
        </View>
      ) : null}
    </View>
  );
};

export default NfcReader;
