function parseData(data) {
	const dataArr = [];
    data.item.children.forEach((child) => {
        const nodes = child.children ? child.children : [];
        if (child.name !== 'index.xml') {
        dataArr.push({
            id: child.name,
            text: child.name,
            url: child.url,
            children: generateChildren(nodes),
            a_attr: {
            	href:child.url,
            }
        })
      }
    })
   return dataArr;
}

function generateChildren(parentChildren) {
    if(!parentChildren) return ` `;
    const filteredChild = parentChildren.filter((child) => child.name !== 'index.xml');
    return filteredChild.map((child) => {
      return {
          id: child.name,
          text: child.name,
          url: child.url,
          children: generateChildren(child.children),
          a_attr: {
              href: child.url,
          }
      }
    })
  }

