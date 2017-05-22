---
title: Introduction
weight: 80
menu:
  main:
    parent: CLI
    identifier: cli-introduction
    weight: 80
---

## What is the Flynt CLI?

Flynt CLI makes working with Flynt simple and quick. It contains commands that cover setting up Wordpress, installing the theme, synchronizing databases, and handling deployment.

## Install

To install Flynt CLI with [npm](https://npmjs.org), run:

```
npm install flynt-cli -g
```

## Commands

For a list of all available commands run:
```
flynt --help
```

## Setup
Setup a new flynt project.

```
flynt setup
```

Run `flynt setup --help` to see all of the available commands:

- `installBedrock` - Installs [roots Bedrock](https://roots.io/bedrock/).
- `requireComposerPackages` - Installs external dependencies via [Composer](https://getcomposer.org/).
- `setupTheme` -  Clones the Flynt theme and runs Yarn to install theme dependencies.
- `initGitRepo` - Initializes new git repo.
- `createDb` - Creates a new database and user on localhost.
- `setupWordpress` - Runs through Wordpress core setup, creates Wordpress salts.
- `activateWordpress` - Activates the Flynt theme.

## Clone
Clone database and media files between environments.

```
flynt clone
```

## Deploy
Deploy source code from local to any environment.

```
flynt deploy
```
