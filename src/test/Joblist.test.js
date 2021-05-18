const jobList = require('../components/JobList')

describe('AddToOrder component', () => {
  it('should be handling checkboxChecked', () => {
    const wrapper = shallow(<AddToOrder {...props.cart} />);
    expect(wrapper.checkBoxChecked()).equals(true); //error appears here
  });
});