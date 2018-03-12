import React from "react"

export function getComponentsLists(compStories) {
  let result = [];
  Object.keys(compStories).forEach(componentKey => {
    const componentStory = compStories[componentKey];
    const components = Object.values(componentStory);
    result.push(components);
  });
  return result;
}

export  function prepareStoryFromComponents(componentLists) {
  return (
    <div>
      {componentLists.map(compList => (
        <div>
          {compList.map(comp => <span style={{ margin: 15 }}>{comp}</span>)}
          <hr style={{ margin: 10 }} />
        </div>
      ))}
    </div>
  );
}
