## NfcReader.js
Here is an example of a React Native component that uses the React Native NFC API to read RFID data using an NFC-enabled mobile device.
This component uses the NfcManager module to interact with the NFC API. When the component mounts, it calls NfcManager.start() to start the NFC manager on Android (it is already started on iOS).
The component also registers a handleTagDiscovery function as a listener for the NfcEvents.DiscoverTag event. This function is called when an NFC tag is detected, and it sets the tag state variable with the tag object.
The readTag function registers the component to listen for NFC tag events. When a tag is detected, it calls the handleTagDiscovery function with the detected tag object.
Finally, the component renders a button that calls the readTag function when pressed. If the tag state variable is set, it renders the RFID data.
## NfcWriter.js
This component uses the NfcManager module to interact with the NFC API. When the component mounts, it calls NfcManager.start() to start the NFC manager on Android (it is already started on iOS).
The component also registers a handleTagDiscovery function as a listener for the NfcEvents.DiscoverTag event. This function is called when an NFC tag is detected, and it sets the tag state variable with the tag object.
The writeTag function requests the NfcTech.Ndef technology and displays an alert message to the user. It then encodes the text as bytes and creates an NDEF message containing a text record with the bytes. Finally, it writes the message to the tag using NfcManager.ndef.write(). If the write is successful, it clears the tag and text state variables.
Finally, the component renders a text input for the user to enter the data to write to the tag, and a button that calls the writeTag function when pressed. If no tag is detected, it logs a warning to the console.
## Samsung App
NFC совместимые NTAG21x
https://www.wakdev.com/en/more/wiki/apps/nfc-chips-for-nfc-tools.html
