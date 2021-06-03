import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  MenuItem,
  TextField,
  TextFieldProps,
  Typography,
  withWidth,
  isWidthDown,
} from "@material-ui/core";
import { useFieldArray, useForm, RefCallBack } from "react-hook-form";
import liff from "@line/liff";
import { BetType, betTypes, isThreeNum } from "./BetType";
import { Breakpoint } from "@material-ui/core/styles/createBreakpoints";

interface Bet {
  type?: BetType;
  target?: string;
  amount?: number;
}

interface Values {
  bets: Bet[];
}

const TextFieldForm: React.FC<TextFieldProps & { ref: RefCallBack }> = (
  props
) => {
  const { ref, ...otherProps } = props;
  return <TextField {...otherProps} inputRef={ref} />;
};

const defaultBet: Bet = {
  type: undefined,
  target: undefined,
  amount: undefined,
};

const Liff: React.FC<{ width: Breakpoint }> = (props) => {
  const [error, setError] = useState(undefined);
  const { width } = props;
  const {
    control,
    register,
    formState: { errors },
    handleSubmit,
    watch,
    getValues,
  } = useForm<Values>({
    defaultValues: {
      bets: [defaultBet],
    },
  });
  const { append } = useFieldArray<Values>({
    control,
    name: "bets",
  });

  const { bets } = getValues();

  useEffect(() => {
    liff
      .init({ liffId: "1656063536-1BR9j7Qg" })
      .catch((error) => setError(error));
  }, []);

  if (error) {
    return <div>ERROR NAJA</div>;
  }

  if (!liff.ready) {
    return <div>Loading</div>;
  }

  // if (!liff.isLoggedIn()) {
  //   liff.login();
  //   return <div>Loading</div>;
  // }

  console.log(watch(), errors);

  const spacing = isWidthDown(width, "md") ? 2 : 2;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        console.log("hhi");

        handleSubmit(console.log)(e);
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
        }
      }}
    >
      <Box p={1}>
        <Container>
          <Grid container spacing={spacing} direction="column">
            <Grid item>
              <Grid item xs={12}>
                <Typography variant="h6">แทงดิ่</Typography>
              </Grid>
            </Grid>
            <Grid item>
              {bets.map((bet, index) => (
                <Grid key={index} container spacing={spacing}>
                  <Grid item xs={12}>
                    <Typography>การแทงที่ {index + 1}</Typography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextFieldForm
                      label="ประเภทการแทง"
                      variant="outlined"
                      size="small"
                      select
                      fullWidth
                      {...register(`bets.${index}.type` as const, {
                        required: {
                          value: true,
                          message: "กรุณาเลือกประเภทการแทง",
                        },
                      })}
                      error={errors.bets && !!errors.bets[index]?.type}
                      helperText={
                        errors.bets && errors.bets[index]?.type?.message
                      }
                    >
                      {betTypes.map((bt) => (
                        <MenuItem key={bt.name} value={bt.id}>
                          {bt.name}
                        </MenuItem>
                      ))}
                    </TextFieldForm>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Box textAlign="right">
                      <TextFieldForm
                        label="เลขที่ต้องการแทง"
                        variant="outlined"
                        size="small"
                        fullWidth
                        {...register(`bets.${index}.target` as const, {
                          maxLength: {
                            value: isThreeNum(bet.type || 0) ? 3 : 2,
                            message: `กรุณาใส่เลข ${
                              isThreeNum(bet.type || 0) ? 3 : 2
                            } หลักเท่านั้น`,
                          },
                          minLength: {
                            value: isThreeNum(bet.type || 0) ? 3 : 2,
                            message: `กรุณาใส่เลข ${
                              isThreeNum(bet.type || 0) ? 3 : 2
                            } หลักเท่านั้น`,
                          },
                          required: {
                            value: true,
                            message: "กรุณาใส่เลขที่ต้องการแทง",
                          },
                        })}
                        error={errors.bets && !!errors.bets[index]?.target}
                        helperText={
                          errors.bets && errors.bets[index]?.target?.message
                        }
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Box textAlign="right">
                      <TextFieldForm
                        label="ยอด"
                        variant="outlined"
                        size="small"
                        fullWidth
                        type="number"
                        InputProps={{ endAdornment: "บาท" }}
                        {...register(`bets.${index}.amount` as const, {
                          required: {
                            value: true,
                            message: "กรุณาใส่ยอดที่ต้องการแทง",
                          },
                        })}
                        error={errors.bets && !!errors.bets[index]?.amount}
                        helperText={
                          errors.bets && errors.bets[index]?.amount?.message
                        }
                      />
                    </Box>
                  </Grid>
                </Grid>
              ))}
            </Grid>
            <Grid container spacing={spacing} justify="center" item>
              <Grid item xs={6} md={3}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={() => {
                    append(defaultBet);
                  }}
                >
                  แทงเพิ่ม
                </Button>
              </Grid>
              <Grid item xs={6} md={3}>
                <Button variant="contained" type="submit" fullWidth>
                  ส่งโพยยยย
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </form>
  );
};

export default withWidth()(Liff);
