import React from "react";
import LionessProvider  from "../../src/lib/lioness/components/LionessProvider";
import {t} from '@core/utils/gettext'

export const getLioness = translations => storyFn => {
  return (
    <LionessProvider messages={translations} locale="en">
      {storyFn()}
    </LionessProvider>
  );
};

const lioness = function(storyFn) {

  const Story = storyFn;

  return (
    <LionessProvider messages={{}} locale="en">
      <Story t={t}/>
    </LionessProvider>
  );
};

export default lioness;
