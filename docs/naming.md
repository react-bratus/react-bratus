# Naming conventions for the application

1. **_Classnames_**: Classnames should be as specific as possible, and will be written in kebab-case
   - F.ex.: className="individual-booking-table"

   <br>

2. **_Component names_**: All component names need to be PascalCase. And those components that are\
also pages, should have the Page suffix. Also the component's CSS file, should have the same\
name as the component.
   - F.ex., case1: "BookingOverviewPage"

   <br>

3. **_Folder names_**: When we are talking about folders that contain the components, we will use\
PascalCase, while with parent folders, like components and utils, we will use lower case naming.
   - F.ex., case1: "BookingOverview"
   - F.ex., case2: "components"

   <br>

4. **_Function names_**: Functions should be written with camelCase and be as descriptive as possible.
   - F.ex.: "handleFilteredBookings"

   <br>

# Other practices to follow throughout the project

1. **_Props passing_**: For props passing we will use object destructuring directly in the parameters,\
or outside the parameters in case there are a lot of props.
   - F.ex., case 1: const ExampleComponent = ({prop1, prop2, prop3}) =>
   - F.ex., case 2: const {prop1, prop2, prop3, prop4, prop5, prop6} = props

<br>

2. **_Component logic_**: Functions inside components should be extracted to the utils folder. In this\
way we keep the components as simple as possible and more organized.
