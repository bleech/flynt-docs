FROM ubuntu:16.04

ENV DEBIAN_FRONTEND noninteractive

RUN apt-get update \
  && apt-get install -y --no-install-recommends \
    curl \
    ca-certificates \
    git \
  && rm -rf /var/lib/apt/lists/*

RUN curl -sL https://deb.nodesource.com/setup_6.x | bash - \
  && apt-get update \
  && apt-get install -y --no-install-recommends nodejs \
  && rm -rf /var/lib/apt/lists/*

RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - \
  && echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list \
  && apt-get update \
  && apt-get install -y --no-install-recommends yarn \
  && rm -rf /var/lib/apt/lists/*

RUN apt-get -qq update \
	&& apt-get -qq install -y --no-install-recommends python-pygments \
    software-properties-common \
    python-software-properties \
	&& rm -rf /var/lib/apt/lists/*

RUN add-apt-repository ppa:longsleep/golang-backports \
  && apt-get update \
  && apt-get install -y --no-install-recommends golang-go \
  && rm -rf /var/lib/apt/lists/*

ENV GOPATH /go
ENV PATH $GOPATH/bin:/usr/local/go/bin:$PATH

RUN apt-get update \
  && apt-get install -y --no-install-recommends build-essential \
  && rm -rf /var/lib/apt/lists/*

RUN go get -u github.com/kardianos/govendor \
  && govendor get github.com/spf13/hugo

RUN cd /go/src/github.com/spf13/hugo \
  && make install

RUN mkdir /usr/share/src
WORKDIR /usr/share/src

# Expose default hugo port
EXPOSE 1313

# By default, serve site
CMD yarn && yarn run build && yarn run buildIndex
