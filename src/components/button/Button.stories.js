//@flow

import React from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import { host } from 'storybook-host';
import Button from './Button';
import _pick from 'lodash/pick';


const props:any = {
  label: 'TEST',
  onClick: action('click'),
};

const storyBook = {
  base: <Button {...props} />,
  raised: <Button {...props} raised />,
  fluid: <Button {...props} raised fluid />,
  floating: <Button {...props} href="/register" target="_blank" raised />,
  link: <Button {...props} href="/register" target="_blank" raised />,
  primary: <Button {...props} primary />,
  disabled: <Button {...props} disabled />,
  'primary raised': <Button {...props}  raised primary />,
  'primary floating': <Button {...props} floating />,
  'primary link': <Button {...props} floating />,
  'primary disabled': <Button {...props} disabled />,
};

const stories = storiesOf(`Components/Button`, module)
.addDecorator(host({align: 'center top'}));

Object.keys(storyBook).forEach(storyKey => stories.add(storyKey, () => storyBook[storyKey]));

export default _pick(storyBook, ['base', 'raised', 'link', 'primary', 'primary raised', 'primary disabled']);
