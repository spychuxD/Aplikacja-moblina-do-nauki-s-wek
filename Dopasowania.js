import React from "react";
import { Menu, Divider, Box, Pressable } from "native-base";
import { MaterialIcons } from '@expo/vector-icons';

const Dopasowania = () => {

    return <Box w="90%" alignItems="center">
    <Menu closeOnSelect={false} w="190" menuPosition="left" onOpen={() => console.log("opened")} onClose={() => console.log("closed")} trigger={triggerProps => {
    return <Pressable {...triggerProps}>
             <MaterialIcons name="menu" size={24} color="black" />
          </Pressable>;
  }}>
      <Menu.OptionGroup defaultValue="Arial" title="free" type="radio"
      onChange={(value) => console.log(`Selected value: ${value}`)}>
        <Menu.ItemOption value="Arial">Arial</Menu.ItemOption>
        <Menu.ItemOption value="Nunito Sans">Nunito Sans</Menu.ItemOption>
        <Menu.ItemOption value="Roboto">Roboto</Menu.ItemOption>
      </Menu.OptionGroup>
      <Divider mt="3" w="100%" />
      <Menu.OptionGroup title="paid" type="checkbox">
        <Menu.ItemOption value="SF Pro">SF Pro</Menu.ItemOption>
        <Menu.ItemOption value="Helvetica">Helvetica</Menu.ItemOption>
      </Menu.OptionGroup>
    </Menu>
  </Box>;

  };

export default Dopasowania;