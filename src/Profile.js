import React, {Component} from 'react';
import {Image, Text, View, SafeAreaView, StyleSheet} from 'react-native';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      profile: null,
    };
  }

  componentDidMount() {
    const {token} = this.props.route.params; //this is how we can get the params from the navigation action we performed on login page
    console.log(token); // Can the person pass data between screens?? Yeah

    //Also, no API on https://reqres.in asked for token in request header so I just used thier profile fetch API

    this.fetchProfile();
  }

  fetchProfile = async () => {
    //The login API returned token and no user ID so I am assuming user ID comes and is then used while fetching profile
    const userId = 2;

    try {
      const req = await fetch(`https://reqres.in/api/users/${userId}`);
      const resp = await req.json();
      const {data} = resp;
      this.setState({profile: data});
    } catch (e) {
      console.error(e);
    }
  };

  render() {
    const {profile} = this.state;
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <View
          style={{
            padding: 16,
            alignItems: 'center',
            backgroundColor: 'white',
          }}>
          <Text style={{fontSize: 24}}>Profile</Text>
        </View>
        {profile && (
          <View>
            <Image
              source={{uri: profile.avatar}}
              style={{width: '100%', height: 250}}
            />
            <View style={{padding: 30}}>
              <Text style={{fontSize: 24, fontWeight: 'bold'}}>
                {profile.first_name} {profile.last_name}
              </Text>
              <Text style={{fontSize: 22}}>{profile.email}</Text>
            </View>
          </View>
        )}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  engine: {
    position: 'absolute',
    right: 0,
  },
});

export default Profile;
