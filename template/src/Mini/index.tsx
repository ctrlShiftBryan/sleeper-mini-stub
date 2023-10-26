import React from 'react';
import * as RN from 'react-native';
import { Types, Sleeper, Fonts, Theme } from '@sleeperhq/mini-core';

type OwnProps = {
  context: Types.Context;
};

function preload(ids: string[], map: any) {
  const safeMap = map || {};

  ids.map(id => safeMap[id]);
}

const Mini = (props: OwnProps) => {
  const { context } = props;
  const { actions } = context;
  // events.onBackButtonPressed = () => {
  //   // Handle the back button press
  //   // Return 'CONSUMED' if you took control of the action (and want the Sleeper app to do nothing)
  //   // Return 'PROPAGATE' if you took no action and want the event to continue (the Sleeper app will navigate back to the main mini list)
  //   return 'CONSUMED';
  // };

  // const keys = Object.keys(context);

  const keys2 = [
    'leaguesMap',
    'league',
    'user',
    'usersInLeagueMap',
    'rostersInLeagueMap',
    'draftsInLeagueMap',
    'draftPickTradesInLeagueMap',
    'playoffsInLeagueMap',
    'transactionsMap',
    'draftPicksInDraftMap',
    'userLeagueList',
    'leaguesMap',
    'userMap',
    'transactionsInLeagueMap',
  ];

  // todo get all league ids and read all leagues in transactions in leagues
  const leaguesMap = context.leaguesMap || {};
  const leagueIds = Object.keys(leaguesMap);
  const leagues = leagueIds.map(id => leaguesMap[id]);

  const draftsMap = context.draftsInLeagueMap || {};
  const draftIds = Object.keys(draftsMap);

  const activeLeagueIds = leagues.map(l => l.league_id);
  preload(activeLeagueIds, context.transactionsInLeagueMap);
  preload(activeLeagueIds, context.rostersInLeagueMap);
  preload(activeLeagueIds, context.usersInLeagueMap);
  preload(activeLeagueIds, context.draftsInLeagueMap);
  preload(activeLeagueIds, context.draftPickTradesInLeagueMap);
  preload(draftIds, context.draftPicksInDraftMap);
  const leagueToUse = context.league || leagues[0];

  const nonProxy = {};
  keys2.forEach(key => {
    const obj = context[key];
    const keys3 = Object.keys(obj || {});
    const newObj = {};
    keys3.forEach(key3 => {
      const object3 = obj[key3];
      newObj[key3] = object3;
    });
    nonProxy[key] = newObj;
  });

  (nonProxy as any).league = leagueToUse;

  console.log('--------------------------');
  console.log(nonProxy);
  console.log('--------------------------');

  return (
    <RN.View style={styles.container}>
      <Sleeper.Text style={styles.text}>
        Hello {context?.user?.display_name}!
      </Sleeper.Text>
      <Sleeper.Text style={styles.text}>
        Open app.json and select a sample to learn what API features are
        available.
      </Sleeper.Text>
      <Sleeper.Text style={styles.text}>
        When you're ready to get started, edit this file (src/Mini/index.tsx)
        and add your own code.
      </Sleeper.Text>
      <Sleeper.Text style={styles.text}>
        Feel free to copy any package from mini_packages.json to this project's
        package.json. They will be included in your final mini.
      </Sleeper.Text>
    </RN.View>
  );
};

const styles = RN.StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: Theme.primaryText,
    padding: 10,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    margin: 5,
    ...Fonts.Styles.Body1,
  },
});

export default Mini;
