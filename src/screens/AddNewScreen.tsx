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

const initValues = {
  title: '',
  description: '',
  location: {
    title: '',
    address: '',
  },
  imageUrl: '',
  users: [],
  authorId: '',
  startAt: Date.now(),
  endAt: Date.now(),
  date: Date.now(),
};

const AddNewScreen = () => {
  const auth = useSelector(authSelector);
  //console.log(auth);
  const [eventData, setEventData] = useState<any>({
    ...initValues,
    authorId: auth.id,
  });

  const [usersSelects, setUsersSelects] = useState<SelectModel[]>([]);

  const handleChangeValue = (key: string, value: string | Date | string[]) => {
    const items = {...eventData};
    items[`${key}`] = value;

    setEventData(items);
  };

  const [fileSelected, setFileSelected] = useState<any>();

  useEffect(() => {
    handleGetAllUsers();
  }, []);

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
    // const res = await userAPI.HandleUser('/get-all');
    // console.log(res);
    console.log(eventData);
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
          onSelect={val =>
            val.type === 'url'
              ? handleChangeValue('photoUrl', val.value as string)
              : setFileSelected(val.value)
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
          value={eventData.location.title}
          onChange={val =>
            handleChangeValue('location', {...eventData.location, title: val})
          }
        />

        {/* Map */}
        <ChoiceLocation />

        {/* Price */}
        <InputComponent
          placeholder="Price"
          allowClear
          type="number-pad"
          value={eventData.price}
          onChange={val => handleChangeValue('price', val)}
        />
      </SectionComponent>

      <SectionComponent>
        <ButtonComponent
          text="Add New"
          onPress={handleAddEvent}
          type="primary"
        />
      </SectionComponent>
    </ContainerComponent>
  );
};

export default AddNewScreen;
