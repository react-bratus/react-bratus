# Collaboration Principles

<br/>

## Code Formatting

- **Prettier**: Main formatter. We discussed and approved that code should be always indented\
before being pushed. In this way you can write consistent code, that everyone will understand.

- **Spacing**: Let code blocks breathe. Always 1 empty line between CSS classes, different\
components, different functions, in order to improve readability.

<br />

## Working with GIT

### Branches

- **Main**: Main is protected. 2 approvals needed in order to push to it.

- **Develop**: Develop is protected. 1 approval needed in order to push to it. We need to avoid\
pushing directly to the main. Develop is going to be the target branch that we will branch\
out from in order to work on the project. When we have a release, we will make a PR from\
Develop to Main with the working functionality.

- **Individual Branches**:
Before working on a task, we will create a New Task in GH Projects, and convert\
it to an issue. This issue is associated with a number. F.ex., #19. When you create\
a new branch make sure you do it from Develop.

  - The naming should be [name]/[issue-number]-[description-of-the-task] Process:
  - git checkout develop
  - git pull (pull the latest from origin)
  - git checkout -b evgenios/19-refactoring-graph-component

<br/>

### Push

- **Pushing**: When we push the commit message should have the number of the issue.\
F.ex. git commit -m "19: Pushing whatever"

<br/>

### Pull Request

Whenever you make a Pull Request you need to:

- Write a clear readable description:
  - What are you doing?
  - Mention the issue number that you are working on.
  - Write if you face any kind of issues.
- Always put yourself as an assignee.
- Put all people as reviewers. Not all have to approve it but they can see that you made a PR.
- Be open minded about the comments that others do on your code, accept and argue if you don't.
- Approve the PR only in case you don't have comments to make. Otherwise request changes.
- Always delete your branch after the PR is approved and your branch is merged into Develop.

<br />
<br />

## GitHub Projects

<br />

### Dashboard Structure

GitHub Projects will be use to track our project. You can have different views of a dashboard.\
Right now we have 5 columns on the Dashboard view. These are:

- **Backlog**: Just a regular backlog. Issues that we don't currently work on. Like a TODO.

- **In Analysis**: When we start investigating an issue, possible ways of approaching it, doing\
research on how other people have solved our problem.

- **In Development**: Comes after Analysis. When you start implementing your solution and start\
the coding part.

- **In Code Review**: When you finish development and make a Pull Request. The others need to approve\
or request changes.

- **Merged**: When it's merged in the Development Branch.
<br />
<br />

### Creating an issue

**Steps**:

- Add Task button.
- Convert it to an issue.
- Assign yourself to it as soon as you drag it in analysis. Otherwise it stays in the backlog.
- Make sure to put a label on it.
- Write a clear description of what needs to be implemented, and maybe a possible solution, so that\
the others can get an idea of how to approach it.
