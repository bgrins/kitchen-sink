import { faker } from "https://esm.sh/@faker-js/faker/locale/en";
faker.seed(123);

const users = [
  createRandomUser(),
  createRandomUser(),
  createRandomUser(),
  createRandomUser(),
];

function createRandomUser() {
  const sex = faker.name.sexType();
  const firstName = faker.name.firstName(sex);
  const lastName = faker.name.lastName();
  const email = faker.helpers.unique(faker.internet.email, [
    firstName,
    lastName,
  ]);

  return {
    _id: faker.datatype.uuid(),
    avatar: faker.image.avatar(),
    birthday: faker.date.birthdate(),
    email,
    userName: faker.helpers.unique(faker.internet.userName, [
      firstName,
      lastName,
    ]),
    firstName,
    lastName,
    sex,
    subscriptionTier: faker.helpers.arrayElement(["free", "basic", "business"]),
  };
}

const CSS = `
:root {
  --color-core-primary: #3740ff;
  --color-core-tertiary: #6001ff;
  --color-core-bg: #fff;
  
  --color-avatars-background: #f8f9fa;
}

.avatars {
  --gap: 0.35em;
  --avatar-size: 5em;
  --overlap-size: 2em;
  --hover-overlap-size: 4em; /* Best to keep lower than --avatar-size so that there is still some overlap on hover */
  --border-size: 0.4em;
  --num-children: 4; /* Value is automatically updated based on the number of children. See :has() below. Does not work in Firefox though. */
  --num-children-1: calc(var(--num-children) - 1);

  background: var(--color-avatars-background);
  border-radius: var(--avatar-size);
  
  display: grid;
  gap: var(--gap);
  padding: var(--gap);
  margin: 0 auto;
  
  
  grid-auto-flow: column;
  grid-template-columns: repeat(var(--num-children), var(--grid-cell-size-to-use));
/* 	grid-auto-columns: var(--grid-cell-size-to-use); */
  width: calc(var(--grid-cell-size-to-use) * var(--num-children-1) + var(--gap) * var(--num-children) + var(--avatar-size) + var(--border-size));
  transition: all ease-in-out 0.25s;

  border: calc(var(--border-size) / 2) solid rgb(0 0 0 / 0.3);
}

.avatars {
  --grid-cell-size-to-use: var(--overlap-size);
}


:is( /* Wrapped in an :is() to not break Firefox which does not support :has() */
  .avatars:hover,
  .avatars:not(hover):has(> :focus) /* Also grow when tabbing into the list */
) {
  --grid-cell-size-to-use: var(--hover-overlap-size, var(--avatar-size));
}

.avatars > * {
  width: var(--avatar-size);
  aspect-ratio: 1;
  height: auto;
  
  clip-path: circle(calc(var(--avatar-size) / 2 + var(--border-size) * 2));
  outline: none;
}

.avatars img {
  width: 100%;
  height: auto;
  
  --border-color: var(--color-core-primary);
  outline: var(--border-size) solid var(--border-color);
  outline-offset: calc(var(--border-size) * -2 + 1px); /* 1px extra to cater for rounding errors */
  
  border: var(--border-size) solid var(--color-avatars-background);
  border-radius: var(--avatar-size);
  
  transition: all ease-in-out 0.15s;
}

.avatars :is(:hover, :focus) > img {
  --border-color: var(--color-core-tertiary);
  scale: 1.1;
}

/* Update --num-children based on the number of children .avatars has */
.avatars:where(:has(> *:nth-of-type(1):last-child)) {
  --num-children: 1;
}
.avatars:where(:has(> *:nth-of-type(2):last-child)) {
  --num-children: 2;
}
.avatars:where(:has(> *:nth-of-type(3):last-child)) {
  --num-children: 3;
}
.avatars:where(:has(> *:nth-of-type(4):last-child)) {
  --num-children: 4;
}
.avatars:where(:has(> *:nth-of-type(5):last-child)) {
  --num-children: 5;
}


/* General styles */
body {
  display: grid;
  place-content: center;
}

p {
  text-align: center;
}

`;

export default () => {
  return (
    <>
      <style type="text/css">{CSS}</style>
      <div class="avatars">
        {users.map((user) => (
          <a href="#">
            <img src={user.avatar} alt={user.userName} />
          </a>
        ))}
      </div>
    </>
  );
};
