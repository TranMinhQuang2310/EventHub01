import {
  View,
  Text,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  Platform,
  StatusBar,
  Image,
} from 'react-native';
import React from 'react';
import {
  ButtonComponent,
  CardComponent,
  ContainerComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TabBarComponent,
  TextComponent,
} from '../../components';
import {
  ArrowLeft,
  ArrowLeft2,
  ArrowRight,
  Calendar,
  Location,
} from 'iconsax-react-native';
import {appColors} from '../../constants/appColors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {globalStyles} from '../../styles/globalStyles';
import {LinearGradient} from 'react-native-linear-gradient';
import AvatarGroup from '../../components/AvatarGroup';
import {EventModel} from '../../models/EventModel';
import {fontFamilies} from '../../constants/fontFamilies';

const EventDetail = ({navigation, route}: any) => {
  //Truyền item từ EventItem.tsx
  const {item}: {item: EventModel} = route.params;
  return (
    <View style={{flex: 1, backgroundColor: appColors.white}}>
      <ImageBackground
        source={require('../../assets/images/event-image.png')}
        style={{flex: 1, height: 244, zIndex: -1}}
        imageStyle={{
          resizeMode: 'cover',
        }}>
        <LinearGradient colors={['rgba(0,0,0,0.7)', 'rgba(0,0,0,0)']}>
          <RowComponent
            styles={{
              padding: 16,
              alignItems: 'flex-end',
              paddingTop: 42,
            }}>
            <RowComponent styles={{flex: 1}}>
              {/* Icon back */}
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{width: 48, height: 48, justifyContent: 'center'}}>
                <ArrowLeft size={28} color={appColors.white} />
              </TouchableOpacity>
              <TextComponent
                flex={1}
                text="Event Details"
                title
                color={appColors.white}
              />
              {/* bookmark */}
              <CardComponent
                styles={[globalStyles.noSpaceCard, {width: 36, height: 36}]}
                color="#ffffff4D">
                <MaterialIcons
                  name="bookmark"
                  color={appColors.white}
                  size={22}
                />
              </CardComponent>
            </RowComponent>
          </RowComponent>
        </LinearGradient>

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{flex: 1, paddingTop: 244 - 130}}>
          {/* Avatar Group */}
          <SectionComponent>
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <RowComponent
                justify="space-between"
                styles={[
                  globalStyles.shadow,
                  {
                    backgroundColor: appColors.white,
                    borderRadius: 100,
                    paddingHorizontal: 12,
                    width: '90%',
                  },
                ]}>
                <AvatarGroup size={36} />
                <TouchableOpacity
                  style={[
                    globalStyles.button,
                    {backgroundColor: appColors.primary, paddingVertical: 8},
                  ]}>
                  <TextComponent text="Invite" color={appColors.white} />
                </TouchableOpacity>
              </RowComponent>
            </View>
          </SectionComponent>

          <View style={{backgroundColor: appColors.white}}>
            {/* item.title => Lấy title từ HomeScreen */}
            <SectionComponent>
              <TextComponent
                title
                text={item.title}
                font={fontFamilies.medium}
                size={34}
              />
            </SectionComponent>

            <SectionComponent>
              <RowComponent styles={{marginBottom: 20}}>
                {/* Icon Calendar */}
                <CardComponent
                  styles={[globalStyles.noSpaceCard, {width: 48, height: 48}]}
                  color={`${appColors.primary}4D`}>
                  <Calendar
                    variant="Bold"
                    color={appColors.primary}
                    size={24}
                  />
                </CardComponent>
                <SpaceComponent width={16} />
                <View
                  style={{flex: 1, height: 48, justifyContent: 'space-around'}}>
                  <TextComponent
                    text="14 December, 2021"
                    font={fontFamilies.medium}
                    size={16}
                  />
                  <TextComponent
                    text="Tuesday, 4:00PM - 9:00PM"
                    color={appColors.gray}
                  />
                </View>
              </RowComponent>

              <RowComponent styles={{marginBottom: 20}}>
                {/* Icon Location */}
                <CardComponent
                  styles={[globalStyles.noSpaceCard, {width: 48, height: 48}]}
                  color={`${appColors.primary}4D`}>
                  <Location
                    variant="Bold"
                    color={appColors.primary}
                    size={24}
                  />
                </CardComponent>
                <SpaceComponent width={16} />
                <View
                  style={{flex: 1, height: 48, justifyContent: 'space-around'}}>
                  <TextComponent
                    text={item.location.title}
                    font={fontFamilies.medium}
                    size={16}
                  />
                  <TextComponent
                    text={item.location.address}
                    color={appColors.gray}
                  />
                </View>
              </RowComponent>

              <RowComponent styles={{marginBottom: 20}}>
                {/* Image*/}
                <Image
                  source={{
                    uri: 'https://cdn.oneesports.vn/cdn-data/sites/4/2022/02/hinh-nen-Luffy-2K-chat-ngau.jpg',
                  }}
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    resizeMode: 'cover',
                  }}
                />
                <SpaceComponent width={16} />
                <View
                  style={{flex: 1, height: 48, justifyContent: 'space-around'}}>
                  <TextComponent
                    text="Ashfak Sayem"
                    font={fontFamilies.medium}
                    size={16}
                  />
                  <TextComponent text="Organizer" color={appColors.gray} />
                </View>
              </RowComponent>
            </SectionComponent>

            <TabBarComponent title="About Event" />
            <SectionComponent>
              <TextComponent text={item.description} />
            </SectionComponent>

            <SectionComponent>
              <TextComponent text={item.description} />
            </SectionComponent>
            <SectionComponent>
              <TextComponent text={item.description} />
            </SectionComponent>
            <SectionComponent>
              <TextComponent text={item.description} />
            </SectionComponent>
          </View>
        </ScrollView>
      </ImageBackground>

      {/* Buy Ticket */}
      <LinearGradient
        colors={['rgba(255,255,255,0.9)', 'rgba(255,255,255,1)']}
        // start - end : Chỉnh mờ từ góc trái
        start={{x: 0.0, y: 0.25}}
        end={{x: 0, y: 0}}
        style={{
          position: 'absolute',
          right: 0,
          bottom: 0,
          left: 0,
          padding: 12,
        }}>
        <ButtonComponent
          text="Buy Ticket $120"
          type="primary"
          onPress={() => {}}
          iconFlex="right"
          icon={
            <View
              style={[
                globalStyles.iconContainer,
                {backgroundColor: '##3D56F0'},
              ]}>
              <ArrowRight size={18} color={appColors.white} />
            </View>
          }
        />
      </LinearGradient>
    </View>
  );
};

export default EventDetail;
