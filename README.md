# share-price-calculator

Infers breakeven share prices of Yes/No Augur markets from user assumptions.

Live version can be seen [here](https://musing-jennings-d2c811.netlify.com/).

### Background

Augur (v1) handles Invalid markets by giving each outcome share an equal portion of the escrowed ETH. For example, if a Yes/No market resolves as Invalid, then each share of Yes will receive a 0.5 ETH, and each share of No will receive 0.5 ETH.

This has important implications for traders trying to value market shares, because it means that, in general, the price of a Yes share is _not_ equal the probability that the market resolves Yes.

Let S<sub>y</sub> and S<sub>n</sub> be the number of shares of Yes and No (respectively) held by a trader in a Yes/No market.

Let P<sub>y</sub>, P<sub>n</sub>, P<sub>i</sub> be the probabilities that the market will resolve to Yes, No, and Invalid (respectively).

Then the expected value of the trader's position is given by:

P<sub>y</sub>S<sub>y</sub> + P<sub>n</sub>S<sub>n</sub> + P<sub>i</sub>(0.5S<sub>y</sub> + 0.5S<sub>n</sub>)

This can be simplified to:

(P<sub>y</sub> + 0.5P<sub>i</sub>)S<sub>y</sub> + (P<sub>n</sub> + 0.5P<sub>i</sub>)S<sub>n</sub>

It follows that the equilibrium price of Yes shares is given by P<sub>y</sub> + 0.5P<sub>i</sub>, while the equilibrium price of No shares is given by P<sub>n</sub> + 0.5P<sub>i</sub>. In other words, if there is any positive probability that the market will resolve as Invalid, then the price of Yes shares and No shares should both be _greater than_ their respective probabilities.

This tool is designed to help calculate the equilibrium price of Yes and No shares (under this system where Invalid pays out 50/50 to Yes/No) given a user's assumptions about the probabilities of the market resolving as Yes, No, and Invalid.
