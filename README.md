# NfcReader.js
Here is an example of a React Native component that uses the React Native NFC API to read RFID data using an NFC-enabled mobile device.
This component uses the NfcManager module to interact with the NFC API. When the component mounts, it calls NfcManager.start() to start the NFC manager on Android (it is already started on iOS).
The component also registers a handleTagDiscovery function as a listener for the NfcEvents.DiscoverTag event. This function is called when an NFC tag is detected, and it sets the tag state variable with the tag object.
The readTag function registers the component to listen for NFC tag events. When a tag is detected, it calls the handleTagDiscovery function with the detected tag object.
Finally, the component renders a button that calls the readTag function when pressed. If the tag state variable is set, it renders the RFID data.
