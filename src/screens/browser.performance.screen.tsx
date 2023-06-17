import { useState } from "react";
import { Box, Container, Grid, TextInput, ActionIcon, useMantineTheme } from "@mantine/core";
import { IconSearch, IconArrowRight, IconArrowLeft } from '@tabler/icons-react';
import { PerformanceCard } from "src/components/performance.comp";
import { useGetPerformance, PerformanceResponse, useGetAllPerformance } from "src/api/performance.api";
import { useMapData } from "src/hooks/useMapData";
import { useDebouncedValue } from "@mantine/hooks";

import { useNavigate } from 'react-router-dom';

export default function BrowsePerformance() {
    const theme = useMantineTheme();
    const { data, error, isLoading } = useGetAllPerformance();
    const { mappedData } = useMapData<PerformanceResponse>(data);

    const [value, setValue] = useState<string>('');
    const [debounced] = useDebouncedValue(value, 300);

    const navigate = useNavigate();

    const navigateBuy = (id: string) => {
        navigate("/browse-performance/booking", { state: { pId: id } });
    }

    return (
        <Container>
            <Box style={{ margin: "1rem 0" }}>
                <TextInput
                    icon={<IconSearch size="1.1rem" stroke={1.5} />}
                    radius="xl"
                    size="md"
                    rightSection={
                        <ActionIcon size={32} radius="xl" color={theme.primaryColor} variant="filled">
                            {theme.dir === 'ltr' ? (
                                <IconArrowRight size="1.1rem" stroke={1.5} />
                            ) : (
                                <IconArrowLeft size="1.1rem" stroke={1.5} />
                            )}
                        </ActionIcon>
                    }
                    placeholder="Search Performance"
                    rightSectionWidth={42}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.currentTarget.value)}
                />
            </Box>
            <Grid>
                {
                    mappedData?.filter((fd) => fd.name.toLowerCase().startsWith(debounced))
                        .map((md) => (
                            <Grid.Col span={4} key={md._id}>
                                <PerformanceCard handleOnClick={() => navigateBuy(md._id)} category={md.genre} image={md.poster!} title={md.name} key={md._id} />
                            </Grid.Col>
                        ))
                }
            </Grid>
        </Container>
    )
}