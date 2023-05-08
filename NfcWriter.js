import React, { useState, useEffect } from 'react';
import { Text, View, Platform, TouchableOpacity, TextInput } from 'react-native';
import NfcManager, { NfcTech, NfcEvents } from 'react-native-nfc-manager';

const NfcWriter = () => {
  const [text, setText] = useState('');
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

  const writeTag = async () => {
    if (tag) {
      try {
        await NfcManager.requestTechnology(NfcTech.Ndef, {
          alertMessage: 'Ready to write data',
        });

        const bytes = NfcManager.stringToBytes(text);
        const message = NfcManager.ndef.encodeMessage([NfcManager.ndef.textRecord(bytes)]);

        await NfcManager.ndef.write(message);

        setTag(null);
        setText('');

        NfcManager.cancelTechnologyRequest();
      } catch (ex) {
        console.warn('Error while writing NFC tag', ex);
      }
    } else {
      console.warn('No tag detected');
    }
  };

  return (
    <View>
      <TextInput value={text} onChangeText={setText} />
      <TouchableOpacity onPress={writeTag}>
        <Text>Write RFID data</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NfcWriter;
