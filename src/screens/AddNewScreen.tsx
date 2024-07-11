import {View, Text, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  ButtonComponent,
  ButtonImagePicker,
  ChoiceLocation,
  ContainerComponent,
  DateTimePicker,
  DropdownPicker,
  InputComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../components';
import {useSelector} from 'react-redux';
import {authSelector} from '../redux/reducers/authReducer';
import userAPI from '../apis/userAPi';
import {SelectModel} from '../models/SelectModel';
import {ImageOrVideo} from 'react-native-image-crop-picker';
import {Validate} from '../utils/validate';
import {appColors} from '../constants/appColors';
import storage from '@react-native-firebase/storage';
import {EventModel} from '../models/EventModel';
import eventAPI from '../apis/eventAPi';

const initValues = {
  title: '',
  description: '',
  locationTitle: '',
  locationAddress: '',
  position: {
    lat: '',
    long: '',
  },
  photoUrl: '',
  users: [],
  authorId: '',
  startAt: Date.now(),
  endAt: Date.now(),
  date: Date.now(),
  price: '',
  category: '',
};

const AddNewScreen = ({navigation}: any) => {
  const auth = useSelector(authSelector);
  //console.log(auth);
  const [eventData, setEventData] = useState<any>({
    ...initValues,
    authorId: auth.id,
  });

  const [usersSelects, setUsersSelects] = useState<SelectModel[]>([]);
  const [fileSelected, setFileSelected] = useState<any>();
  const [errorMess, setErrorMess] = useState<string[]>([]);

  useEffect(() => {
    handleGetAllUsers();
  }, []);

  //Mỗi lần có dữ liệu được nhập vào => Thực hiện validate
  useEffect(() => {
    const mess = Validate.EventValidation(eventData);

    setErrorMess(mess);
  }, [eventData]);

  const handleChangeValue = (key: string, value: string | Date | string[]) => {
    const items = {...eventData};
    items[`${key}`] = value;

    setEventData(items);
  };

  //Goi API sau khi click dropdown 'Invited users'
  const handleGetAllUsers = async () => {
    const api = `/get-all`;

    try {
      const res: any = await userAPI.HandleUser(api);

      if (res && res.data) {
        const items: SelectModel[] = [];

        res.data.forEach(
          (item: any) =>
            item.email &&
            items.push({
              label: item.email,
              value: item.id,
            }),
        );

        setUsersSelects(items);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //Gọi API sau khi click button 'Add New'
  const handleAddEvent = async () => {
    if (fileSelected) {
      //Nếu là file => Cắt tên fileName
      const filename = `${fileSelected.filename ?? `image-${Date.now()}`}.${
        fileSelected.path.split('.')[1]
      }`;
      //console.log(filename);

      //Đường dẫn đến Storage trên FireBase
      const path = `image/${filename}`;

      const res = storage().ref(path).putFile(fileSelected.path);

      res.on(
        'state_changed',
        snap => {
          //Xem dung lượng file được bao nhiêu GB
          console.log(snap.bytesTransferred);
        },
        error => {
          console.log(error);
        },
        () => {
          //Kiểm tra đường dẫn url trước khi push lên Storage của Firebase
          storage()
            .ref(path)
            .getDownloadURL()
            .then(url => {
              eventData.photoUrl = url;
              //Nếu đúng đường dẫn url => gọi tới hàm push lên Storage của Firebase
              handlePushEvent(eventData);
            });
        },
      );
    } else {
      //Nếu là Url
      handlePushEvent(eventData);
    }
  };

  const handlePushEvent = async (event: EventModel) => {
    //console.log(event);

    const api = `/add-new`;
    try {
      const res = await eventAPI.HandleEvent(api, event, 'post');
      navigation.navigate('Explore', {
        screen: 'HomeScreen',
      });

      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  //Handle file được chọn
  const handleFileSelected = (val: ImageOrVideo) => {
    //Sau khi chọn file từ library hoặc chụp hình => thay thế hình đã chọn trước đó
    setFileSelected(val);
    handleChangeValue('photoUrl', val.path);
  };

  //Handle vị trí được chọn
  const handleLocation = (val: any) => {
    const items = {...eventData};
    items.position = val.position;
    items.locationAddress = val.address;

    setEventData(items);
  };
  return (
    <ContainerComponent isScroll>
      <SectionComponent>
        <TextComponent text="Add New" title />
      </SectionComponent>
      <SectionComponent>
        {/* Image sau khi được upload */}
        {eventData.photoUrl || fileSelected ? (
          <Image
            source={{
              uri: eventData.photoUrl ? eventData.photoUrl : fileSelected.uri,
            }}
            style={{width: '100%', height: 250}}
            resizeMode="cover"
          />
        ) : (
          <></>
        )}
        {/* Upload Image */}
        <ButtonImagePicker
          onSelect={(val: any) =>
            val.type === 'url'
              ? handleChangeValue('photoUrl', val.value as string)
              : handleFileSelected(val.value)
          }
        />

        {/* Title */}
        <InputComponent
          placeholder="Title"
          value={eventData.title}
          allowClear
          onChange={val => handleChangeValue('title', val)}
        />

        {/* Description */}
        <InputComponent
          placeholder="Description"
          //Cho phép xuống dòng
          multiline
          numberOfLine={3}
          allowClear
          value={eventData.description}
          onChange={val => handleChangeValue('description', val)}
        />

        {/* Category */}
        <DropdownPicker
          selected={eventData.category}
          values={[
            {
              label: 'Sport',
              value: 'sport',
            },
            {
              label: 'Food',
              value: 'food',
            },
            {
              label: 'Art',
              value: 'art',
            },
            {
              label: 'Music',
              value: 'music',
            },
          ]}
          onSelect={val => handleChangeValue('category', val)}
        />

        <RowComponent>
          {/* startAt */}
          <DateTimePicker
            label="Start at :"
            type="time"
            onSelect={val => handleChangeValue('startAt', val)}
            selected={eventData.startAt}
          />
          <SpaceComponent width={20} />
          {/* endAt */}
          <DateTimePicker
            label="End at :"
            type="time"
            onSelect={val => handleChangeValue('endAt', val)}
            selected={eventData.endAt}
          />
        </RowComponent>

        {/* Date */}
        <DateTimePicker
          label="Date :"
          type="date"
          onSelect={val => handleChangeValue('date', val)}
          selected={eventData.date}
        />

        {/* Dropdown Picker */}
        <DropdownPicker
          label="Invited users"
          values={usersSelects}
          onSelect={(val: string | string[]) =>
            handleChangeValue('users', val as string[])
          }
          selected={eventData.users}
          //Cho phép chọn nhiều
          multible
        />

        {/* Title Address */}
        <InputComponent
          placeholder="Title Address"
          allowClear
          value={eventData.locationTitle}
          onChange={val => handleChangeValue('locationTitle', val)}
        />

        {/* Map */}
        <ChoiceLocation onSelect={val => handleLocation(val)} />

        {/* Price */}
        <InputComponent
          placeholder="Price"
          allowClear
          type="number-pad"
          value={eventData.price}
          onChange={val => handleChangeValue('price', val)}
        />
      </SectionComponent>

      {/* Thông báo validate */}
      {errorMess.length > 0 && (
        <SectionComponent>
          {errorMess.map(mess => (
            <TextComponent
              text={mess}
              key={mess}
              color={appColors.danger}
              styles={{marginBottom: 12}}
            />
          ))}
        </SectionComponent>
      )}

      {/* Button Add New */}
      <SectionComponent>
        <ButtonComponent
          //Khi nào có dữ liệu được nhập => enable button Add
          disable={errorMess.length > 0}
          text="Add New"
          onPress={handleAddEvent}
          type="primary"
        />
      </SectionComponent>
    </ContainerComponent>
  );
};

export default AddNewScreen;
