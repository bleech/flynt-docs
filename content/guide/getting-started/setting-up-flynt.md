---
title: Setting up Flynt
weight: 11
menu:
  main:
    parent: "Getting Started"
    weight: 11
---

## Requirements

Before you can get started with Flynt, there are some requirements that need to be met on your local machine. To make things easier you can use tools such as [Trellis](https://roots.io/trellis/) or [Scotchbox](https://box.scotch.io/) and skip directly to [Creating a Flynt project](/guide/getting-started/setting-up-flynt/#creating-a-flynt-project). If you want to set up your environment manually, keep reading.

The following tools and versions are required for Flynt to work correctly. Other versions than the ones listed here are not explicitly tested and may or may not work with Flynt.

### Command Line

These tools must be available in your system's PATH environment.

|                    Command Line Tool                    | Version |
| ------------------------------------------------------- | ------- |
| [Node](https://nodejs.org/)                             | >= 6.0  |
| [Composer](https://getcomposer.org/)                    | >= 1.2  |
| [Yarn](https://yarnpkg.com/)*                           | >= 0.21 |
| [PHPCS](https://github.com/squizlabs/PHP_CodeSniffer)** | >= 2.5  |

\*_You can use npm as well, but Yarn is strongly recommended._  
\*\*_Not strictly required, but strongly recommended._

### Server

|           Requirement           | Version |
| ------------------------------- | ------- |
| [PHP](http://php.net/)          | >= 5.6  |
| [MySQL](https://www.mysql.com/) | >= 5.6  |

Additionally, you will need a way to manage your virtual host setup. This can be done either manually via a hosts file or with tools like [Mamp Pro](https://www.mamp.info/en/mamp-pro/).

## Creating a Flynt project

As soon as you have your environment set up, follow the steps below to create a new Flynt project.

1. Using the command line, install the Flynt CLI:
  ```
  yarn global add @flyntwp/flynt-cli
  ```

2. Run the create command and follow the instructions:
  ```
  flynt create
  ```

3. Set up the virtual host provided during step 2 and you're good to go!

<div class="alert alert-info">
  <h2>Need help?</h2>
  <p>If you are stuck or having issues setting Flynt up, leave an issue on Github for further assistance:</p>
  <ul>
    <li><a href="https://github.com/flyntwp/flynt-core/issues">Github - Core Plugin Issues</a></li>
    <li><a href="https://github.com/flyntwp/flynt-starter-theme/issues">Github - Starter Theme Issues</a></li>
  </ul>
</div>
